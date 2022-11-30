import { ChangeEvent, useEffect, useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import ApiClient from '../apiClient';
import '../App.css';
import { Product } from '../models/product';

function CreateScreen(props: {
  editId?: string,
  goToListing: () => void
}) {

  const apiClient = new ApiClient();


  const [newName, setNewName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [value, setValue] = useState<number>();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    if (props.editId == null) return setIsLoading(false);
    setIsLoading(true);
    apiClient.details(props.editId).then(response => {
      setNewName(response.produto);
      setDescription(response.descricao);
      setValue(response.valor);
      setIsLoading(false);
    });

  };

  const saveProduct = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newName == '' || value == null || description == '') return;

    let product: Product = {
      produto: newName,
      descricao: description,
      valor: value!,
    }
    let response = props.editId == null
      ? await apiClient.create(product)
      : await apiClient.update(props.editId, product);

    if (response) props.goToListing();
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => setNewName(event.target.value);

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => setDescription(event.target.value);

  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => setValue(Number(event.target.value));

  return (
    <>
      {isLoading && <div className="loader"></div>}
      {!isLoading && <div className="create">
        <div className='navBar'>
          <button className='comeBackButton' onClick={props.goToListing}><FaChevronLeft size={18} /></button>
          <h2>{props.editId == null ? 'Novo Produto' : 'Editar Produto'}</h2>
        </div>
        <div>
          <div className='detailsWrapper'>
            <form className='productDetails' onSubmit={saveProduct}>
              <label htmlFor='productName'>Produto</label>
              <input required value={newName} id='productName' onChange={handleNameChange} />
              <label htmlFor='productDescription'>Descrição</label>
              <textarea required value={description} id='productDescription' onChange={handleDescriptionChange} />
              <label htmlFor='productValue'>Valor</label>
              <input required value={value} id='productValue' onChange={handleValueChange} type='number' min={0} />
              <button id='saveProduct' type='submit'>Salvar{!props.editId && ' Novo'} Produto</button>
            </form>
          </div>
        </div>
      </div>
      }
    </>
  );
}

export default CreateScreen;
