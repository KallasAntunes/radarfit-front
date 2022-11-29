import { Product } from "./models/product";

class ApiClient {
    baseUrl = 'http://localhost:5000/api';

    async getAll(): Promise<Product[]> {
        let response = await fetch(this.baseUrl + '/produtos/');
        return response.json();
    }

    async find(q: string): Promise<Product[]> {
        let response = await fetch(this.baseUrl + '/produtos/find/?q=' + q);
        console.log(response.json);
        return response.json();
    }

    async details(id: string): Promise<Product> {
        let response = await fetch(this.baseUrl + '/produtos/' + id);
        return response.json();
    }

    async create(product: Product): Promise<boolean> {
        let response = await fetch(this.baseUrl + '/produtos/', {
            method: 'POST',
            body: JSON.stringify(product),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return response.ok;
    }

    async update(id: string, product: Product): Promise<boolean> {
        let response = await fetch(this.baseUrl + '/produtos/' + id, {
            method: 'PUT',
            body: JSON.stringify(product),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return response.ok;
    }

    async patch(id: string, product: Product): Promise<boolean> {
        let response = await fetch(this.baseUrl + '/produtos/' + id, {
            method: 'PUT',
            body: JSON.stringify(product),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return response.ok;
    }

    async delete(id: string): Promise<boolean> {
        let response = await fetch(this.baseUrl + '/produtos/' + id, {
            method: 'DELETE'
        });
        console.log(response)
        return response.ok;
    }

}
export default ApiClient;
