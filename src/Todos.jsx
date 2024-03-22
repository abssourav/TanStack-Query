import axios from "axios";
import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";

const newPost = {
  albumId: 1,
  id: 101,
  title: "Abs sourav",
  url: "https://via.placeholder.com/600/92c952",
  thumbnailUrl: "https://via.placeholder.com/150/92c952",
};

const getTodos = async () => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
  console.log(res);
  return res.data;
};

const addTodos = async (newTodos) => {
  return await axios.post(
    "https://jsonplaceholder.typicode.com/posts",
    newTodos
  );
};
const Todos = () => {
  const {
    isLoading,
    error,
    data: todos,
  } = useQuery({
    queryFn: getTodos,
    queryKey: ["Todos"],
    staleTime: Infinity,
  });

  const queryClient = new QueryClient();
  const { isError, isPending, isSuccess, mutate } = useMutation({
    mutationFn: addTodos,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["Todos"] });
    },
  });

  if (isLoading) return <div>Loading....</div>;
  if (error) return <div>{error.message}</div>;
  if (isPending) return <div>Updating....</div>;
  if (isError) return <div>{error.message}</div>;
  if (isSuccess) return <div>post added successfully</div>;

  return (
    <div>
      <div>
        <button onClick={() => mutate(newPost)}>Add</button>
      </div>
      {todos && todos.map((todo, index) => <h1 key={index}>{todo.title}</h1>)}
    </div>
  );
};

export default Todos;
