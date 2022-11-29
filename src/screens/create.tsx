import { ChangeEvent, useEffect, useState } from 'react';
import ApiClient from '../apiClient';
import '../App.css';
import { Product } from '../models/product';

function CreateScreen(props: {
  editId?: string,
  goToListing: () => void
}) {

  const apiClient = new ApiClient();

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [value, setValue] = useState<number>();

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    if (props.editId == null) return;
    let response = await apiClient.details(props.editId);
    setName(response.produto);
    setDescription(response.descricao);
    setValue(response.valor);
  };

  const saveProduct = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name == '' || value == null || description == '') return;

    let product: Product = {
      produto: name,
      descricao: description,
      valor: value!,
    }
    let response = props.editId == null
      ? await apiClient.create(product)
      : await apiClient.update(props.editId, product);

    if (response) props.goToListing();
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => setName(event.target.value);

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => setDescription(event.target.value);

  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => setValue(Number(event.target.value));


  return (
    <div className="create">
      <button onClick={props.goToListing}>🔙</button>
      <div>
        <form onSubmit={saveProduct}>
          <label>Produto</label>
          <input value={name} onChange={handleNameChange} />
          <label>Descrição</label>
          <input value={description} onChange={handleDescriptionChange} />
          <label>Valor</label>
          <input value={value} onChange={handleValueChange} type='number' min={0} />
          <button>Salvar{!props.editId && ' Novo'} Produto</button>
        </form>
      </div>
    </div>
  );
}

export default CreateScreen;
