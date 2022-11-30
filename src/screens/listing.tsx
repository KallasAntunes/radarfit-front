import { ChangeEvent, useEffect, useState } from 'react';
import ApiClient from '../apiClient';
import '../App.css';
import { FaSearch, FaPlus } from "react-icons/fa";
import { Product } from '../models/product';

function ListingScreen(props: {
    goToCreate: (id?: string) => void,
    goToDetails: (id: string) => void,
}) {

    const apiClient = new ApiClient();

    const [products, setProducts] = useState<Product[]>([]);

    const [isLoading, setIsLoading] = useState(true);

    const [q, setQ] = useState('');

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        setIsLoading(true);
        apiClient.getAll().then(response => {
            setProducts(response);
            setIsLoading(false);
        });
    };

    const searchProducts = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        apiClient.find(q).then(response => {
            setProducts(response);
            setIsLoading(false);
        });
    };

    const changeQ = (event: ChangeEvent<HTMLInputElement>) =>
        setQ(event.target.value);

    return (
        <div className="listing">
            <div className='navBar'>
                <button type='button' id='addButton' onClick={() => props.goToCreate()}><FaPlus size={17} /></button>
                <form onSubmit={searchProducts}>
                    <input id='searchBar' placeholder='Pesquisar produtos' type="text" value={q} onChange={changeQ} />
                    <button type='submit'><FaSearch size={16} /></button>
                </form>
            </div>
            {isLoading && <div className="loader"></div>}
            <div className='productsContainer'>
                {!isLoading && products.map(product =>
                    <button className='productCard' type='button' onClick={() => props.goToDetails(product._id!)}>
                        <p>Produto: {product.produto}</p>
                        <p>Valor: R${product.valor}</p>
                    </button>
                )}
            </div>
        </div>
    );
}

export default ListingScreen;
