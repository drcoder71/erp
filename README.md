# ERP Backend System (Node.js + MongoDB)

## Project Overview

This project is a **simple ERP backend system** for inventory-based businesses.

It manages:

- Products
- Purchase Receipts (stock IN)
- Sales (stock OUT)

The system follows **real ERP rules**, not just CRUD.

---

## Main Goal

The goal is to demonstrate **correct ERP behavior**:

- Stock changes only through documents
- Confirmed documents are immutable
- No negative stock
- Full audit history

This project is implemented as a **technical task** for a **Junior Node.js Backend Developer** role.

---

## Core ERP Principles

### 1. Document Lifecycle

All business documents follow this flow:

- **DRAFT**: editable, no stock impact
- **CONFIRMED**: stock changes, document locked
- **CANCELLED**: stock reverted, audit preserved

Reverse transitions are not allowed.

---

### 2. Inventory Rules

- Stock **increases** only via **Purchase Receipt**
- Stock **decreases** only via **Sales**
- Product CRUD **never changes stock**
- Stock **cannot go negative**

---

### 3. Auditability

Every document stores:

- `created_by`, `created_at`
- `confirmed_by`, `confirmed_at`
- `cancelled_by`, `cancelled_at`
- `cancellation_reason`

No important data is deleted.

---

## Modules

---

## Product Module

### Product Tracking Types

Each product has **one tracking type**:

| Type        | Description                |
| ----------- | -------------------------- |
| SIMPLE      | Quantity only              |
| EXPIRABLE   | Quantity + expiration date |
| LOT_TRACKED | Quantity grouped by lot    |
| SERIALIZED  | Unique serial numbers      |
| VARIANT     | Parent + child variants    |

---

### Variant Rules

- Parent product:
  - ❌ Not sellable
  - ❌ No stock
- Variant product:
  - ✅ Has own SKU
  - ✅ Has stock
  - ✅ Can be sold or purchased

---

### Product Rules

- Tracking type **cannot be changed** after usage
- SKU **cannot be changed** after usage
- Hard delete is forbidden (soft delete only)

---

## Purchase Receipt Module

### Purpose

Represents **goods arrival** into the warehouse.

### Behavior

- **CONFIRMED** → stock increases
- **CANCELLED** → stock reverts

---

## API Routes

### Products

`POST /products
GET /products
GET /products/:id
PATCH /products/:id
PATCH /products/:id/deactivate`

---

### Purchase Receipts

`POST /purchase-receipts
PATCH /purchase-receipts/:id/confirm
PATCH /purchase-receipts/:id/cancel`

---

### Sales

`POST /sales
PATCH /sales/:id/confirm
PATCH /sales/:id/cancel`
