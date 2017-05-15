# NullspaceVR Azure Functions #

The following folder contains two [Azure Functions](https://azure.microsoft.com/en-us/services/functions/).

**NodeUpdate** accepts a JSON Array of nodes and status. It either updates or creates new status based on the node label that is sent to it. In addition it stores the time of the status if changed. 

*Example Data*
```json
[
	{"nodelabel":123123211,"status":0},
	{"nodelabel":452545454,"status":1},
	{"nodelabel":321432421,"status":0},
	{"nodelabel":231214333,"status":1},
	{"nodelabel":"acfv43454","status":0},
	{"nodelabel":"fgg4addv3","status":1},
	{"nodelabel":"fdafdsadd","status":0},
	{"nodelabel":343434323,"status":1}	
]
```
**NodeStatus** Returns a JSON array of all nodes and their associated status. 

*Example return data*
```json
[
  {
    "NodeId": 1,
    "NodeLabel": "123123211",
    "Status": 0,
    "DateModified": "2017-05-11T11:48:49.36"
  },
  {
    "NodeId": 2,
    "NodeLabel": "452545454",
    "Status": 1,
    "DateModified": "2017-05-11T11:48:49.36"
  }
]
```
