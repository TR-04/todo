const Todo = () => {
  return (
    <div className="flex justify-center gap-5 mt-50 h-auto p-20">
      <div className="rounded-lg bg-white shadow-lg flex w-80 justify-center h-40">
        <div className="flex">Todo</div>
        <div className="flex">Content</div>
      </div>

      <div className="rounded-lg bg-white shadow-lg flex w-80 justify-center">In progress</div>
      <div className="rounded-lg  bg-white shadow-lg flex w-80 justify-center">Finished</div>
    </div>
  );
};

export default Todo;
