import { useState, useEffect } from 'react';
import ApiClient from '../apiClient';
import '../App.css';
import { Product } from '../models/product';

function DetailsScreen(props: {
    id: string,
    goToCreate: (id: string) => void,
    goToListing: () => void
}) {

    const apiClient = new ApiClient();

    const [product, setProduct] = useState<Product>();

    useEffect(() => {
        getDetails();
    }, []);

    const getDetails = async () => {
        let response = await apiClient.details(props.id);
        setProduct(response);
    };

    const deleteProduct = async (id: string) => {
        let response = await apiClient.delete(id);
        if (response) props.goToListing();
    };

    return (
        <div className="details">
            <button onClick={props.goToListing}>🔙</button>
            <div>
                {JSON.stringify(product)}
                <button onClick={() => props.goToCreate(props.id)}>✏️</button>
                <button onClick={() => deleteProduct(props.id)}>❌</button>
            </div>
        </div>
    );
}

export default DetailsScreen;
