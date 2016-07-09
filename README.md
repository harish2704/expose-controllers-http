# expose-controllers-http
Expose the API controllers to browser side by taking web-api as a medium.

# Basic Idea

* This a command line tool to generate an Abstract base Api class from controller definitions.
* Currently this done by simply rendering a EJS template
* Controllers are defined as generic Promises.
* Controllers take one data object as input.
  * In-case of GET & DELETE Request, input of controller is req.query.
  * Else it is fed with req.body
* Controller mount point is derived from its name.

# Example 
* See some controllers definitions 
  * https://github.com/harish2704/active-snippets-api/blob/master/controllers/snippets.js
  * https://github.com/harish2704/active-snippets-api/blob/master/controllers/auth.js
* And the generated class
  * https://github.com/harish2704/active-snippets/blob/new-api/frontend/BaseApi.js
