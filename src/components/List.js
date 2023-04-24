import React from 'react'

const List = ({ beers, filteredProducts }) => {
    return (
        <div className='row product'>

            {filteredProducts.length === 1 ? filteredProducts.map(beer => (
                <>
                    <div className="col-lg-3 col-md-4 col-sm-6" key={beer.id}>
                        <div className='card '>
                            <img src={beer.image_url} className="item-pic card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{beer.name}</h5>
                                <p className="card-text">{beer.tagline}</p>
                            </div>
                        </div>
                    </div>
                </>

            )) : beers.map(beer => (
                <>
                    <div className="col-lg-3 col-md-4 col-sm-6" key={beer.id}>
                        <div className='card '>
                            <img src={beer.image_url} className="item-pic card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{beer.name}</h5>
                                <p className="card-text">{beer.tagline}</p>
                            </div>
                        </div>
                    </div>
                </>
            ))}
        </div>
    )
}

export default List
