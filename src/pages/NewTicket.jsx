import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createTicket, reset } from "../features/tickets/ticketSlice";
import Spinner from '../components/Spinner.jsx';
import BackButton from "../components/BackButton";

const NewTicket = () => {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector((state) => state.tickets);

  const { name, email } = user;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState("iPhone");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if(isError){
      toast.error(message);
    }

    if(isSuccess){
      dispatch(reset());
      navigate('/tickets');
    }

    dispatch(reset());
  }, [dispatch, isError, isSuccess, navigate, message])


  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createTicket({ product, description }));
  };


  if(isLoading){
    return <Spinner />
  }

  return (
    <>
    <BackButton  url='/'/>
      <section className="heading">
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below </p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input
            type="text"
            name="name"
            value={name}
            disabled
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Customer Email</label>
          <input
            type="email"
            name="email"
            value={email}
            disabled
            className="form-control"
          />
        </div>

        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="product">Product</label>
                <select
                    name="product"
                    id="product"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    >
                    <option value="iPhone">iPhone</option>
                    <option value="iPod">iPod</option>
                    <option value="Macbook Pro">Macbook Pro</option>
                    <option value="iMac">iMac</option>
                    <option value="iPad">iPad</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description of the issue</label>
                <textarea name="description" id="description" placeholder="Description of the issue" value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>

              <div className="form-group">
                <button className="btn btn-block">
                    Submit
                </button>
              </div>
        </form>
      </section>
    </>
  );
};

export default NewTicket;
