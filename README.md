# jssdk-admin-widgets

Admin widgets allow manipulation / creation of user based objects stored within the API.

## Users Admin Widget
*Renders a multi functional user manipulation data table where manipulations or modifications can occur based on current logged in privileges.*
* status : api status model
* options :
  * fetchRecordsLater (boolean) : If set to true then user / group information will be fetched on instantiation rather than through the login model change event.