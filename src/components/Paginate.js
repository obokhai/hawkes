const Paginate = ({ page, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-between">

    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="text-gray-500 hover:text-black disabled:opacity-40"
        >
        &lt;
      </button>

      {pages.map(p => (
        <button
        key={p}
        onClick={() => onPageChange(p)}
        className={`px-3 py-1 rounded ${
          p === page
          ? 'bg-gray-200 text-black font-semibold'
          : 'text-gray-500 hover:text-black'
        }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="text-gray-500 hover:text-black disabled:opacity-40"
        >
        &gt;
      </button>
    </div>
  </div>
  );
};


export default Paginate