# Loan Calculator

This web application provides users with an easy and efficient way to calculate their loan repayments. With a simple interface and powerful functionality, users can quickly determine their monthly payments based on loan amount, term, and interest rate.

# NOTE!

Application on purpose has couple of vulnerabilities:
- being able to provide negative numbers in LoanCalculator.tsx view,
- credentials being stored in session storage (user id, email, name),
- usage of simple json-server to make api calls - database is a json file stored inside the project.
- in order to log in there is a GET call, which gets all the users and then, a function iterates through the users and seeks for a user with email and password, that match the inputs by the user.


# Running the application

To run the application, follow these steps:

#### Application:

1. Clone the repository:
    ```bash
    git clone = TODO
    cd react-app
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the application in development mode:
    ```bash
    npm run dev
    ```

4. If you want to build the production version:
    ```bash
    npm run build
    ```

# API references:

First of all start the json-server:
```bash
  npx json-server ./src/database/db.json
```
**Main route: http://localhost:3000**

- Get all the users:

```http
  GET /users
```

- Get user:

```http
  GET /users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of user to fetch |

- Get all calculations:

```http
  GET /calculations
```

- Get a certain calculation:

```http
  GET /calculations/${id}
```

| Parameter | Type     | Description                              |
| :-------- | :------- | :--------------------------------------- |
| `id`      | `string` | **Required**. Id of calculation to fetch |

- Add a calculation:

```http
  POST /calculations
```

| Parameter | Type     | Description                                     |
| :-------- | :------- | :---------------------------------------------- |
| `payload` | `object` | **Required**. Payload is needed to add a record |

Usage, when:
```javascript
export const useApi = () => {

    const call = async <R, P = {}>(url: string, method: 'GET' | 'POST', body?: P) => {

        const commonData = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const reqData = body ? {
            ...commonData,
            body: JSON.stringify(body)
        } : commonData

        try {
            const res = await fetch("http://localhost:3000/" + url, reqData);

            if (res.ok) {
                const data: R = await res.json();
                return data;
            } else {
                const apiError = await res.text();
                throw new Error(apiError);
            }

        } catch (e) {
            throw new Error('Error occured!');
        }
    }

    const apiGet = async<R>(url: string) => {
        return await call<R>(url, 'GET');
    }

    const apiPost = async<R, P>(url: string, data: P) => {
        return await call<R, P>(url, 'POST', data);
    }

    return {
        apiGet,
        apiPost,
    }
}
```

Calling the funciton:
```javascript
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApi } from "../hooks/useApi";
import { Calculation, CalculationDto } from "../types";

export const usePostCalculationMutation = (userId: string | null) => {
    const { apiPost } = useApi();
    const queryClient = useQueryClient();

    const { mutate, data, error, isPending, isSuccess } = useMutation({
        mutationKey: ['calculations', userId],
        mutationFn: async (payload: CalculationDto) => {
            return apiPost<Calculation, CalculationDto>(`calculations`, payload);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['calculations', userId]
            });
        }
    });

    return {
        data,
        mutate,
        isPending,
        error,
        isSuccess
    }
}
```

# Tech stack
Application was created using:

