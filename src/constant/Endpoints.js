export default {
  LOGIN_USER: '/user/login',
  CREATE_USER: '/user/create',
  UPDATE_USER: '/user/:id',
  GET_USERS_DATA: '/user/all?page=0&perPage=20',
  GET_ROLES_DATA: '/user-role/all?page=0&perPage=10',
  GET_PERMISSIONS_DATA: '/user-permission/all?page=0&perPage=10',
  GET_ACTIONS_DATA: '/user-permission/actions/all?page=0&perPage=10',
  CREATE_WAREHOUSE: '/warehouse/',
  GET_WAREHOUSE_DATA: '/warehouse/all?page=0&perPage=50',
  GET_CHILDREN_FROM_PARENT: '/dashboard/get-children-from-parent',
  LOCATION_DELETE: '/dashboard/delete-location',
  ADD_NEW_ZONE: '/zone',
  ADD_NEW_AREA: '/area',
  ADD_NEW_ROW: '/row',
  ADD_NEW_BAY: '/bay',
  ADD_NEW_LEVEL: '/level',
  ADD_NEW_SUBLEVEL: '/sublevel',
  ADD_ITEM: '/item/',
  EDIT_ITEM: '/item/',
  ADD_INVENTORY: '/inventory',
  GET_INVENTORY: '/inventory/all?page=0&perPage=50',
  GET_INVENTORY_TYPES: '/inventory/types',
  GET_WIDGET_FAMILY_BY_INVENTORY: '/widget-family/search-by-inventory?inventory=',
  ADD_WIDGET_FAMILY: '/widget-family',
  EDIT_WIDGET_FAMILY: '/widget-family/',
  GET_LABEL: '/sublevel/filter',
  GET_PRODUCT_BY_ID: '/item/filter?inventory=',
  GET_ITEMS_BY_INVENTORY: '/item/filter?inventory='
};
