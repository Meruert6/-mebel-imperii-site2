# Database relations

- `users` хранит администраторов (email уникален).
- `categories` связываются с `kitchens` отношением 1-N.
- `materials` связываются с `kitchens` через промежуточную таблицу `kitchen_materials` (N-M).
- `facades` связываются с `kitchens` через промежуточную таблицу `kitchen_facades` (N-M).
- `facade_images` привязаны к `facades` отношением 1-N.
- `kitchen_images` привязаны к `kitchens` отношением 1-N.
- `requests` могут быть связаны с конкретной кухней (`kitchens`) или оставаться без связи.
- `reviews` хранят отзывы клиентов, `review_images` — изображения к отзывам (1-N).

## Связи

- `categories.id` → `kitchens.categoryId`
- `kitchens.id` → `kitchen_images.kitchenId`
- `kitchens.id` → `kitchen_materials.kitchenId`
- `materials.id` → `kitchen_materials.materialId`
- `facades.id` → `kitchen_facades.facadeId`
- `kitchens.id` → `kitchen_facades.kitchenId`
- `facades.id` → `facade_images.facadeId`
- `kitchens.id` → `requests.kitchenId` (nullable)
- `reviews.id` → `review_images.reviewId`