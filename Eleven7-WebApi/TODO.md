########################
##########TODO########## :
########################
#####DB#####:
*   

#####API#####:
*   Update proprely all methods with correct query way
*   Create better version of query methods that allow callbacks or custom errors
*   Encrypt Passwords
*   Create Login Function
*   Clean auth/employee controllers/services
*   Update Employee Function
#   

#####CLIENT#####:
*   Add in navdrawer employee info
*   Update getEmployeeController
*   Add permissions in router
*   Add snackbar in router for login or insuffisant permission
*   Create update User/Employee (page)
    -   From top right corner
*   

#####OVERALL#####:
*   List of jobs
*   List of levels & permissions


#####SCHEDULE#######
#PHASE1 (FUNCTIONNAL)       -> ARCHITECTURE OF CLIENT & API
*   BASIC LAYOUT CLIENT   {DONE}
    - Basic UI
    - Basic Store
*   USER MODEL 
*   BASIC API 
    - Basic Controller/Service

#PHASE2  (AESTHETICS & FUNCTIONNAL)   -> USUABLE CLIENT & API
*   Advanced Layout
    -  Better UI
    -  Menus & 
*   

#PHASE3 (AESTHETICS)        -> PRETTY & CLEAN 
*   Adjusting


####List of views
##Main (/)
*   Home(dashboard) (/dashboard)
*   Login   (/login)
##Stores (/stores)
*   Stores
*   MyStore

##Employees (/employees)
*   EmployeesMain   (/management)
*   EmployeePage    (/:id)
*   EmployeeSchedule  (/schedule/:id)

#Inventory/Products (/stock)
*   ProductList (/products)
*   ProductADD  (/products/add)
*   Inventory   (/inventory)
*   MyInventory (/inventory/:store_id)
*   Supplies    (/supplies)
*   MySupplies (/supplies/:store_id)

-> Should it be ?
1. /stores/inventory/:id
2. /stock/inventory/:id
3. /stores/:id/inventory (approved by marine)




####IDEAS FOR FUTURE#####
*   List of supplier
*   Request of supply from manager
*   Automatic sale simulation
*   Admin page to handle said simulation
*   Reset DB btn (reset btn)