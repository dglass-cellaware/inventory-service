WITH inventory_CTE (id, uom_id, parent_id, container_id) AS 
(
   SELECT
      inventory.id,
      inventory.uom_id,
      inventory.parent_id,
      inventory.container_id 
   FROM
      inventory 
   where
      id = 'LOD000001' 
   UNION ALL
   SELECT
      inventory.id,
      inventory.uom_id,
      inventory.parent_id,
      inventory.container_id 
   FROM
      inventory_CTE 
      INNER JOIN
         inventory 
         ON inventory.parent_id = inventory_CTE.id 
)
SELECT
   * 
FROM
   inventory_CTE