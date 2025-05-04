function Home() {
    return (
        <div >
            <header className="bg-green-500 sticky top-0 flex justify-center">
                <button className="bg-green-200 m-2 p-2">
                    Create Post
                </button>
            </header>
            <PostGrid />
        </div>
    )
}

export default Home;