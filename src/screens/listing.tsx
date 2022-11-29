import { ChangeEvent, useEffect, useState } from 'react';
import ApiClient from '../apiClient';
import '../App.css';
import { Product } from '../models/product';

function ListingScreen(props: {
    goToCreate: (id?: string) => void,
    goToDetails: (id: string) => void,
}) {

    const apiClient = new ApiClient();

    const [products, setProducts] = useState<Product[]>([]);

    const [q, setQ] = useState('');

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let response = await apiClient.getAll();
        setProducts(response);
    };

    const searchProducts = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let response = await apiClient.find(q);
        setProducts(response);
    };

    const changeQ = (event: ChangeEvent<HTMLInputElement>) =>
        setQ(event.target.value);

    const clearQ = () => setQ('');

    return (
        <div className="listing">
            <form onSubmit={searchProducts}>
                <input type="text" value={q} onChange={changeQ} />
                <button type='button' onClick={clearQ}>❌</button>
                <button type='submit'>🔎</button>
            </form>
            <button type='button' onClick={() => props.goToCreate()}>➕</button>
            {products.map(product =>
                <button onClick={() => props.goToDetails(product._id!)}>
                    {JSON.stringify(product)}
                </button>
            )}
        </div>
    );
}

export default ListingScreen;
