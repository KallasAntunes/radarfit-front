import { useState, useEffect } from 'react';
import ApiClient from '../apiClient';
import '../App.css';
import { FaChevronLeft } from "react-icons/fa";
import { Product } from '../models/product';

function DetailsScreen(props: {
    id: string,
    goToCreate: (id: string) => void,
    goToListing: () => void
}) {

    const apiClient = new ApiClient();

    const [product, setProduct] = useState<Product>();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getDetails();
    }, []);

    const getDetails = async () => {
        setIsLoading(true);
        apiClient.details(props.id).then(response => {
            setProduct(response);
            setIsLoading(false);
        });
    };

    const deleteProduct = async (id: string) => {
        let response = await apiClient.delete(id);
        if (response) props.goToListing();
    };

    return (
        <>
            {isLoading && <div className="loader"></div>}
            {!isLoading && <div className="details">
                <div className='navBar'>
                    <button className='comeBackButton' onClick={props.goToListing}><FaChevronLeft size={18} /></button>
                    <h2>{product?.produto}</h2>
                </div>
                <div className='detailsWrapper'>
                    <div className='productDetails'>
                        <p>Id: {product?._id}</p>
                        <p>Descrição: {product?.descricao}</p>
                        <p>Valor: R${product?.valor}</p>
                        <p>Data de edição: {new Date(product?.updated ?? '').toDateString()}</p>
                        <p>Data de criação: {new Date(product?.created ?? '').toDateString()}</p>
                    </div>
                    <div className='buttonWrapper'>
                        <button id='editButton' className='iconButton' onClick={() => props.goToCreate(props.id)}>Editar</button>
                        <button id='deleteButton' className='iconButton' onClick={() => deleteProduct(props.id)}>Excluir</button>
                    </div>
                </div>
            </div>
            }
        </>
    );
}

export default DetailsScreen;
