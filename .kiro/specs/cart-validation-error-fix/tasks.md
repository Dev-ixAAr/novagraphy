# Implementation Plan

- [ ] 1. Write bug condition exploration test
  - **Property 1: Bug Condition** - Filter Unavailable Products and Proceed
  - **CRITICAL**: This test MUST FAIL on unfixed code - failure confirms the bug exists
  - **DO NOT attempt to fix the test or the code when it fails**
  - **NOTE**: This test encodes the expected behavior - it will validate the fix when it passes after implementation
  - **GOAL**: Surface counterexamples that demonstrate the bug exists
  - **Scoped PBT Approach**: For deterministic bugs, scope the property to the concrete failing case(s) to ensure reproducibility
  - Test that when a cart contains one or more deleted products (but at least one valid product), the system filters out unavailable products and proceeds with order creation
  - Test implementation details from Bug Condition in design:
    - Create test products in database
    - Create cart with mix of valid and invalid product IDs
    - Call createOrder with this cart
    - Assert that order is created successfully (not error thrown)
    - Assert that only valid products are included in the order
    - Assert that totals are recalculated correctly
    - Assert that removedProducts information is returned
  - The test assertions should match the Expected Behavior Properties from design (Property 1)
  - Run test on UNFIXED code
  - **EXPECTED OUTCOME**: Test FAILS with error "Some products in your cart are no longer available. Please refresh your cart and try again." (this is correct - it proves the bug exists)
  - Document counterexamples found to understand root cause
  - Mark task complete when test is written, run, and failure is documented
  - _Requirements: 2.1, 2.2, 2.4_

- [ ] 2. Write preservation property tests (BEFORE implementing fix)
  - **Property 2: Preservation** - Valid Cart Behavior
  - **IMPORTANT**: Follow observation-first methodology
  - Observe behavior on UNFIXED code for non-buggy inputs (carts with all valid products)
  - Write property-based tests capturing observed behavior patterns from Preservation Requirements:
    - Test that orders with all valid products create successfully with identical totals
    - Test that order calculation logic (subtotal, shipping, tax) remains unchanged
    - Test that PayHere hash generation and checkout data structure remain unchanged
    - Test that database order creation with PENDING status works correctly
  - Property-based testing generates many test cases for stronger guarantees
  - Run tests on UNFIXED code
  - **EXPECTED OUTCOME**: Tests PASS (this confirms baseline behavior to preserve)
  - Mark task complete when tests are written, run, and passing on unfixed code
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [ ] 3. Fix for cart validation error

  - [ ] 3.1 Implement the filtering logic in createOrder function
    - Replace error throw with filtering logic after identifying missing product IDs
    - Create validItems array containing only items where productId exists in existingIds
    - Handle empty cart edge case: if validItems.length === 0, throw error indicating no valid products remain
    - Update subtotal calculation to use validItems instead of input.items
    - Update order creation to use validItems in items.create
    - Update itemsSummary generation to use validItems
    - _Bug_Condition: isBugCondition(input) where missingIds.length > 0 AND missingIds.length < productIds.length_
    - _Expected_Behavior: Filter unavailable products, recalculate totals, create order with valid items, return removed products info (Property 1 from design)_
    - _Preservation: Orders with all valid products continue to work identically (Property 2 from design)_
    - _Requirements: 2.1, 2.2, 3.1, 3.2, 3.4_

  - [ ] 3.2 Add removed products information to return type
    - Modify PayHereCheckoutData type to include removedProducts field
    - Populate removedProducts with array of removed product information (IDs and names)
    - Ensure this information is available for UI notification
    - _Expected_Behavior: Return information about which products were removed (Requirement 2.4)_
    - _Requirements: 2.4_

  - [ ] 3.3 Verify bug condition exploration test now passes
    - **Property 1: Expected Behavior** - Filter Unavailable Products and Proceed
    - **IMPORTANT**: Re-run the SAME test from task 1 - do NOT write a new test
    - The test from task 1 encodes the expected behavior
    - When this test passes, it confirms the expected behavior is satisfied
    - Run bug condition exploration test from step 1
    - **EXPECTED OUTCOME**: Test PASSES (confirms bug is fixed)
    - Verify that orders are created successfully with filtered products
    - Verify that totals are recalculated correctly
    - Verify that removedProducts information is returned
    - _Requirements: 2.1, 2.2, 2.4_

  - [ ] 3.4 Verify preservation tests still pass
    - **Property 2: Preservation** - Valid Cart Behavior
    - **IMPORTANT**: Re-run the SAME tests from task 2 - do NOT write new tests
    - Run preservation property tests from step 2
    - **EXPECTED OUTCOME**: Tests PASS (confirms no regressions)
    - Confirm all tests still pass after fix (no regressions)
    - Verify that orders with all valid products work identically to before
    - Verify that totals, PayHere data, and database records are unchanged
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [ ] 4. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
