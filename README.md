# PUT IMAGE HERE

## $\color{#FFE338}\textsf{\kern{0.2cm}\normalsize POSTMAN LINK}$

[Click Here] 

## Postman Environment Variable

```json
Variable: base-url-v1,
Type: default,
initial_value:"localhost:5001/api/v1",
current_value:"localhost:5001/api/v1"
```

2. Extract the Access Token:

- In the `Tests/Scripts` tab of the `super-admin/login`,`refresh` request, add the following script to extract the access token from the response headers and save it to an environment variable:

```javascript
// Extract the access token from the response headers
const accessToken = pm.response.headers.get("Authorization");

// Save the access token to an environment variable
pm.environment.set("accessToken", accessToken);
```

3. Set the Access Token for Subsequent Requests:

- For each subsequent request, go to the Headers tab and add a new header:
- - Key: Authorization
- - Value: {{accessToken}}
- This will automatically use the access token stored in the environment variable for all subsequent requests.

4. Remove AccessToken from Postman env

- In the `Tests/Scripts` tab of the `super-admin/logout` request, add the following script to remove the access token from the environment variable:

```javascript
// Check if the response status is 200 (OK)
if (pm.response.code === 200) {
  // Remove the access token from the environment variable
  pm.environment.unset("accessToken");
}
```
