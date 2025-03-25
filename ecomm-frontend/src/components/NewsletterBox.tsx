
const NewsletterBox = () => {

  const onSubmithandler = (event: any) => {
    event.preventDefault();
  }

  return (
    <div className="text-center mt-20">
      <div className="text-2xl font-medium text-gray-00">
        Subscribe Now and get 20% off
      </div>
      <p className="text-gray-400 mt-3">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet ea deserunt mollitia velit.</p>

      <form onSubmit={onSubmithandler} className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3">
        <input className="w-full sm:flex-1 outline-none" type="email" placeholder="Enter your email" required />
        <button type="submit" className="bg-black text-white px-4 py-2">SUBSCRIBE</button>
      </form>
    </div>
  )
}

export default NewsletterBox