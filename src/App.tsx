import { useState } from 'react';
import './App.css';
import CreateScreen from './screens/create';
import DetailsScreen from './screens/details';
import ListingScreen from './screens/listing';

function App() {

  const [id, setId] = useState<string | null>(null);
  const [isCreate, setIsCreate] = useState<boolean>(false);

  const goToCreate = (id?: string) => {
    setIsCreate(true);
    if (id != null) setId(id);
  }

  const goToListing = () => {
    setIsCreate(false);
    setId(null);
  }

  return (
    <div className="App">
      {
        id == null
          ? (isCreate ? <CreateScreen goToListing={goToListing} /> : <ListingScreen goToDetails={setId} goToCreate={goToCreate} />)
          : (isCreate ? <CreateScreen goToListing={goToListing} editId={id} /> : <DetailsScreen goToListing={goToListing} goToCreate={goToCreate} id={id} />)
      }
    </div>
  );
}

export default App;
