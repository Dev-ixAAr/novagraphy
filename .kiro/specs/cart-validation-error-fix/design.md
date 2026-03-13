# Cart Validation Error Fix - Bugfix Design

## Overview

The current checkout flow throws an error and blocks order creation when any product in the cart has been deleted from the database. This fix will implement graceful degradation by filtering out unavailable products, recalculating totals based on valid items, and allowing checkout to proceed. The fix modifies the `createOrder` function in `lib/actions/orders.ts` to handle partial cart validity while preserving all existing behavior for carts with only valid products.

## Glossary

- **Bug_Condition (C)**: The condition that triggers the bug - when one or more product IDs in the cart no longer exist in the database, causing order creation to fail entirely
- **Property (P)**: The desired behavior when unavailable products are detected - filter them out, recalculate totals, and proceed with valid products
- **Preservation**: Existing order creation behavior for valid products that must remain unchanged by the fix
- **createOrder**: The function in `lib/actions/orders.ts` that validates products, calculates totals, creates order records, and generates PayHere checkout data
- **existingIds**: The Set of product IDs that currently exist in the database, used to identify which cart items are valid
- **missingIds**: The array of product IDs from the cart that do not exist in the database

## Bug Details

### Bug Condition

The bug manifests when a user attempts to checkout with a cart containing one or more products that have been deleted from the database. The `createOrder` function validates all product IDs upfront and throws an error if any are missing, preventing order creation even when other products in the cart are still valid.

**Formal Specification:**
```
FUNCTION isBugCondition(input)
  INPUT: input of type CreateOrderInput
  OUTPUT: boolean
  
  productIds := unique product IDs from input.items
  existingIds := product IDs that exist in database
  missingIds := productIds that are NOT in existingIds
  
  RETURN missingIds.length > 0
         AND missingIds.length < productIds.length
         AND order creation is blocked
END FUNCTION
```

### Examples

- **Example 1**: User has 3 products in cart (IDs: "A", "B", "C"). Product "B" is deleted. Expected: Order created with products A and C, totals recalculated. Actual: Error thrown, no order created.

- **Example 2**: User has 5 products in cart. 2 products are deleted. Expected: Order created with 3 remaining products, user notified of 2 removed items. Actual: Error thrown, entire checkout blocked.

- **Example 3**: User has 1 product in cart. That product is deleted. Expected: Error indicating cart is empty. Actual: Error about unavailable products (correct behavior for this edge case).

- **Edge Case**: User has cart with all valid products. Expected: Order created normally with no filtering. Actual: Works correctly (no bug).

## Expected Behavior

### Preservation Requirements

**Unchanged Behaviors:**
- Orders with all valid products must continue to be created successfully with identical totals
- Order calculation logic (subtotal, shipping, tax) must remain unchanged for valid products
- PayHere hash generation and checkout data structure must remain unchanged
- Database order creation with PENDING status and order items must remain unchanged
- The function signature and return type must remain unchanged

**Scope:**
All inputs that do NOT involve deleted products should be completely unaffected by this fix. This includes:
- Carts with all valid products
- Order total calculations for valid items
- PayHere integration and checkout flow
- Database schema and order record structure

## Hypothesized Root Cause

Based on the bug description and code analysis, the root cause is clear:

1. **Fail-Fast Validation**: The function performs upfront validation of all product IDs and throws an error immediately if any are missing, without attempting to filter or recover
   - Lines 48-54 in `lib/actions/orders.ts` check for missing IDs and throw an error
   - This prevents any further processing even when valid products exist

2. **No Filtering Logic**: The function does not attempt to separate valid items from invalid items
   - All items are treated as a single unit
   - No mechanism exists to proceed with a subset of items

3. **No User Notification**: The error message tells users to "refresh your cart" but doesn't specify which products are unavailable
   - Users cannot easily identify which items to remove manually

4. **All-or-Nothing Approach**: The design assumes cart validity is binary (all valid or all invalid)
   - No consideration for partial validity scenarios
   - No graceful degradation path

## Correctness Properties

Property 1: Bug Condition - Filter Unavailable Products and Proceed

_For any_ order creation input where one or more product IDs do not exist in the database but at least one product ID is valid, the fixed createOrder function SHALL filter out the unavailable products, recalculate totals based only on valid products, create the order successfully, and return information about which products were removed.

**Validates: Requirements 2.1, 2.2, 2.4**

Property 2: Preservation - Valid Cart Behavior

_For any_ order creation input where all product IDs exist in the database, the fixed createOrder function SHALL produce exactly the same result as the original function, preserving order creation, total calculations, and PayHere checkout data generation.

**Validates: Requirements 3.1, 3.2, 3.3, 3.4**

## Fix Implementation

### Changes Required

**File**: `lib/actions/orders.ts`

**Function**: `createOrder`

**Specific Changes**:

1. **Filter Invalid Items**: After identifying missing product IDs, filter the input.items array to include only items with valid product IDs
   - Replace the error throw with filtering logic
   - Create `validItems` array containing only items where productId exists in existingIds

2. **Handle Empty Cart Edge Case**: Check if all products were filtered out and throw an appropriate error
   - If validItems.length === 0, throw error indicating no valid products remain
   - This preserves the fail-fast behavior when truly necessary

3. **Recalculate Totals**: Use validItems instead of input.items for all total calculations
   - Update subtotal calculation to use validItems
   - Shipping and tax calculations will automatically use the new subtotal

4. **Update Order Creation**: Pass validItems to the database order creation
   - Change items.create to use validItems instead of input.items

5. **Return Removed Products Info**: Modify return type to include information about filtered products
   - Add removedProducts field to PayHereCheckoutData type
   - Include array of removed product names/IDs in the return value
   - This allows the UI to notify users about what was removed

6. **Update Items Summary**: Ensure itemsSummary uses validItems for PayHere
   - Change itemsSummary generation to use validItems

## Testing Strategy

### Validation Approach

The testing strategy follows a two-phase approach: first, surface counterexamples that demonstrate the bug on unfixed code, then verify the fix works correctly and preserves existing behavior.

### Exploratory Bug Condition Checking

**Goal**: Surface counterexamples that demonstrate the bug BEFORE implementing the fix. Confirm that the current code throws an error when products are missing.

**Test Plan**: Write tests that create orders with carts containing deleted products. Run these tests on the UNFIXED code to observe failures and confirm the error-throwing behavior.

**Test Cases**:
1. **Partial Invalid Cart**: Create order with 3 products where 1 is deleted (will fail on unfixed code with error)
2. **Multiple Invalid Products**: Create order with 5 products where 2 are deleted (will fail on unfixed code with error)
3. **Single Product Deleted**: Create order with 1 product that is deleted (will fail on unfixed code - correct behavior)
4. **All Valid Products**: Create order with all valid products (will succeed on unfixed code - correct behavior)

**Expected Counterexamples**:
- Error thrown: "Some products in your cart are no longer available. Please refresh your cart and try again."
- Order creation blocked even when valid products exist in cart
- No filtering or graceful degradation occurs

### Fix Checking

**Goal**: Verify that for all inputs where the bug condition holds, the fixed function produces the expected behavior.

**Pseudocode:**
```
FOR ALL input WHERE isBugCondition(input) DO
  result := createOrder_fixed(input)
  ASSERT result.orderId exists
  ASSERT result.removedProducts contains missing product info
  ASSERT order in database contains only valid items
  ASSERT totals are calculated correctly for valid items only
END FOR
```

### Preservation Checking

**Goal**: Verify that for all inputs where the bug condition does NOT hold, the fixed function produces the same result as the original function.

**Pseudocode:**
```
FOR ALL input WHERE NOT isBugCondition(input) DO
  result_original := createOrder_original(input)
  result_fixed := createOrder_fixed(input)
  ASSERT result_original.amount = result_fixed.amount
  ASSERT result_original.hash = result_fixed.hash
  ASSERT result_original.itemsSummary = result_fixed.itemsSummary
  ASSERT orders in database are identical
END FOR
```

**Testing Approach**: Property-based testing is recommended for preservation checking because:
- It generates many test cases automatically across the input domain
- It catches edge cases that manual unit tests might miss (different quantities, prices, shipping thresholds)
- It provides strong guarantees that behavior is unchanged for all valid-product inputs

**Test Plan**: Observe behavior on UNFIXED code first for valid carts, then write property-based tests capturing that behavior.

**Test Cases**:
1. **Valid Cart Preservation**: Observe that orders with all valid products create successfully on unfixed code, then write test to verify this continues after fix with identical results
2. **Total Calculation Preservation**: Observe that subtotal, shipping, and tax calculations work correctly on unfixed code, then write test to verify identical calculations after fix
3. **PayHere Data Preservation**: Observe that hash generation and checkout data structure are correct on unfixed code, then write test to verify identical output after fix
4. **Database Record Preservation**: Observe that order records are saved correctly on unfixed code, then write test to verify identical database state after fix

### Unit Tests

- Test filtering logic with various combinations of valid/invalid product IDs
- Test edge case where all products are invalid (should throw error)
- Test edge case where all products are valid (should behave identically to original)
- Test total recalculation with different quantities and prices
- Test that removedProducts information is correctly populated
- Test shipping threshold logic with filtered items (e.g., subtotal drops below $200)

### Property-Based Tests

- Generate random carts with varying numbers of valid/invalid products and verify filtering works correctly
- Generate random product configurations and verify preservation of order creation for all-valid carts
- Test that totals are always calculated correctly regardless of which products are filtered
- Test that PayHere hash generation remains consistent for valid products

### Integration Tests

- Test full checkout flow with partially invalid cart from UI to database
- Test that users receive appropriate notifications about removed products
- Test that order confirmation emails contain only valid products
- Test PayHere integration with filtered cart data
