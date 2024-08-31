import React, { useEffect, useState } from 'react'
// import { Footer, Loader, Navbar } from 'rsuite'
import { useAddRemoveFavoriteMutation, useGetFavoriteByUserIdQuery } from '../../api/favoriteApi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setRecipe } from '../../redux/reducerAction/recipeSlice';
import { Loader, Navbar } from '../../components/sub-comp';
import { Button } from 'react-bootstrap';
import { RootState } from '../../redux/store/storeRedux';
import { setFavorite } from '../../redux/reducerAction/favoriteSlice';
import salmon from '../../img/istockphoto-174914813-612x612.jpg';
import Footer from '../../components/Footer';
import userModel from '../../interfaces/userModel';
import favoriteModel from '../../interfaces/favoriteModel';

function ProductCatalog() {

	const userData: userModel = useSelector(
		(state: RootState) => state.userAuthStore
	);

	const [favorites, setFavorites] = useState<favoriteModel[]>([]);
	const [liked, setLiked] = useState(false);
	const { data, isLoading } = useGetFavoriteByUserIdQuery(userData.id);
	const [addRemoveFavorite] = useAddRemoveFavoriteMutation();
	const persistDataFavorite = useSelector((favorites) => favorites);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	console.log(persistDataFavorite);	

	useEffect(() => {
		if (!isLoading && userData.id != null) {
			dispatch(setRecipe(data.result.$values));
			setFavorites(data.result.$values);
		}
	}, [isLoading]);

	if (isLoading) {
		return <Loader />
	}

	const toggleLiked = async (recId: any) => {
		// const params = { UserId: userData.id, RecipeId: recId };
		// const response: apiResponse = await addRemoveFavorite({ data: params });
		// if (response.error) {
		// 	toastNotify(response.error.data, "error");
		// }
		const setIsFav = favorites.map(
			favorites => favorites.recipeId === recId ? { ...favorites, isFavorited: !favorites.isFavorited ? 1 : 0 } : favorites
		);

		setFavorite(setIsFav);
		setFavorites(setIsFav);
	}

	return (
		<>
			<Navbar />

			<div className="breadcrumb-section" style={{ backgroundImage: `url(${salmon})` }}>
				<div className="container">
					<div className="row">
						<div className="col-lg-8 offset-lg-2 text-center">
							<div className="breadcrumb-text">
								<p>Food Recipe Apps</p>
								<h1>Recipe Catalog</h1>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="product-section mt-100 mb-150">
				<div className="container">
					<div className="row">
						{setFavorites.length > 0 &&
							favorites.map((fav: favoriteModel, index: number) => (
								<div className="col-lg-4 col-md-6" key={index}>
									<div className="single-latest-news">
										<a href="single-news.html">
											<div className="latest-news-bg news-bg-1" style={{ backgroundImage: `url(${fav.imageUrl})`, width: "100%", objectFit: "cover" }}></div>
										</a>
										<div className="news-text-box">
											<div className="row">
												<div className="col-lg-8">
													<h3 style={{ textWrap: 'wrap', height: 55, alignContent: 'center' }}>
														{fav.recipeName}
													</h3>
												</div>
												<div className="col-lg-4">
													<Button variant="danger" onClick={() => toggleLiked(fav.recipeId)} style={{ marginLeft: '50px', marginTop: '10px', borderRadius: '50%' }}>
														{
															fav.isFavorited ? (<i className="fas fa-heart" style={{ color: 'red' }}></i>) : (<i className="fas fa-heart"></i>)
														}
													</Button>
												</div>
											</div>

											<p className="blog-meta">
												<span className="author"><i className="fas fa-user"></i> Recipes Author</span>
												<span className="date"><i className="fas fa-calendar"></i> {new Date(fav.createdAt).toLocaleDateString()}</span>
											</p>

											<p
												className="except"
												style={{
													overflow: 'hidden',
													display: "-webkit-box",
													WebkitLineClamp: 4,
													WebkitBoxOrient: "vertical",
													height: 100
												}}
											>
												{fav.description}
											</p>

											<a onClick={() => navigate(`/singleProduct/${fav.recipeId}`)} className="read-more-btn">read more <i className="fas fa-angle-right"></i></a>
										</div>
									</div>
								</div>
							))}
					</div>

					{/* Pagination Section */}
					<div className="row">
						<div className="container">
							<div className="row">
								<div className="col-lg-12 text-center">
									<div className="pagination-wrap">
										<ul>
											<li><a href="#">Prev</a></li>
											<li><a href="#">1</a></li>
											<li><a className="active" href="#">2</a></li>
											<li><a href="#">3</a></li>
											<li><a href="#">Next</a></li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</>

	)
}

export default ProductCatalog