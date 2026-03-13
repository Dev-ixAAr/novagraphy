# Bugfix Requirements Document

## Introduction

Users encounter a validation error during checkout when their cart contains products that have been deleted from the database. The current implementation throws an error and blocks order creation entirely, preventing users from completing their purchase even if other products in their cart are still valid. This bugfix will filter out unavailable products and allow users to proceed with valid items, while notifying them of the removed products.

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN a user attempts to create an order and one or more product IDs in their cart no longer exist in the database THEN the system throws an error "Some products in your cart are no longer available. Please refresh your cart and try again." and blocks the entire order creation

1.2 WHEN a user has multiple products in their cart and at least one product has been deleted THEN the system prevents checkout for all products, including valid ones

1.3 WHEN the validation error occurs THEN the user's cart state remains unchanged with invalid product references still present

### Expected Behavior (Correct)

2.1 WHEN a user attempts to create an order and one or more product IDs in their cart no longer exist in the database THEN the system SHALL filter out the unavailable products and proceed with order creation for the remaining valid products

2.2 WHEN unavailable products are filtered out during order creation THEN the system SHALL recalculate the order totals (subtotal, shipping, tax, totalAmount) based only on the valid products

2.3 WHEN all products in the cart are unavailable THEN the system SHALL throw an error indicating that no valid products remain and the order cannot be created

2.4 WHEN unavailable products are filtered out THEN the system SHALL return information about which products were removed so the user can be notified

### Unchanged Behavior (Regression Prevention)

3.1 WHEN all products in the cart exist in the database THEN the system SHALL CONTINUE TO create orders successfully without any filtering or modifications

3.2 WHEN calculating order totals (subtotal, shipping, tax) THEN the system SHALL CONTINUE TO use the same calculation logic for valid products

3.3 WHEN generating PayHere checkout data THEN the system SHALL CONTINUE TO include all required fields and generate the correct hash

3.4 WHEN creating order records in the database THEN the system SHALL CONTINUE TO save orders with PENDING status and include all order items
