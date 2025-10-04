import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers, { endpoint, getState }) => {
      const token = localStorage.getItem('aithemetoken');

      // ✅ Only attach token for addWishlist mutation
      if (endpoint === 'addWishlist' || endpoint === 'addOrder' || endpoint === 'editProfile' || endpoint == 'getWhishlist' || endpoint == 'getUser' || endpoint == 'deleteWishlist' || endpoint == 'addCart' || endpoint == 'getCart' || endpoint == 'getOrder' || endpoint == 'deleteCart' || endpoint == 'getBlog' && token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Themes', 'category', 'wishlist'],
  endpoints: (builder) => ({

    registerUser: builder.mutation({
      query: (userData) => ({
        url: 'register/',
        method: 'POST',
        body: userData,
      }),
    }),

    // ✅ Login
    loginUser: builder.mutation({
      query: (formData) => ({
        url: "login/",
        method: "POST",
        body: formData,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.access) {
            dispatch(setToken(data.access)); // ✅ Store token in Redux
          }
        } catch (error) {
          console.error("Login Failed:", error);
        }
      },
    }),


    resetPassword: builder.mutation({
      query: (formData) => ({
        url: 'rest-password/',
        method: 'PUT',
        body: formData,
      }),
    }),

    editProfile: builder.mutation({
      query: (formData) => ({
        url: "update-profile/",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Profile"],
    }),

    getThemes: builder.query({
      query: (args) => {
        const {
          theme_id,
          type,
          fetch_all,
          page_size,
          page,
          category_id,
          subcategory_id,
          search,
          is_trending,
          is_best_seller,
          is_featured,
          is_sale,
          is_free,
          is_new_arrival
        } = args || {}; // ✅ fallback to empty object

        const params = new URLSearchParams();
        if (theme_id) params.append('theme_id', theme_id);
        if (type) params.append('movement_type', type);
        if (page_size) params.append('page_size', page_size);
        if (page) params.append('page', page);
        if (category_id) params.append('category_id', category_id);
        if (subcategory_id) params.append('subcategory_id', subcategory_id);
        if (search) params.append('search', search);
        if (is_trending) params.append('is_trending', 'True');
        if (is_best_seller) params.append('is_best_seller', 'True');
        if (is_featured) params.append('is_featured', 'True');
        if (is_sale) params.append('is_sale', 'True');
        if (is_new_arrival) params.append('is_new_arrival', 'True');
        if (is_free) params.append('is_free', 'True');
        if (fetch_all) params.append('fetch_all', 'True');

        return `view-themes/?${params.toString()}`;
      },
      providesTags: ['Themes'],
    }),

    getCategory: builder.query({
      query: ({ fetch_all } = {}) => {
        const params = new URLSearchParams();
        if (fetch_all) params.append('fetch_all', "true");

        return `view-categories/?${params.toString()}`;
      },
      providesTags: ['category'],
    }),

    getUser: builder.query({
      query: () => 'profile/',
      providesTags: ["Profile"],
    }),

    getScript: builder.query({
      query: () => 'view-tracking-scripts/',
      providesTags: ["Script"],
    }),
    addWishlist: builder.mutation({
      query: (body) => ({
        url: `add-wishlist/`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Themes', 'Whishlist'],
    }),
    getWhishlist: builder.query({
      query: () => `view-wishlist/`,
      providesTags: ['Whishlist'],
    }),
    deleteWishlist: builder.mutation({
      query: (body) => ({
        url: `delete-wishlist/`, // ✅ Make sure this matches your backend route
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['Package', 'Whishlist'], // ✅ Match your actual tag names
    }),

    getSubcategory: builder.query({

      query: ({ category_id, fetch_all } = {}) => {
        const params = new URLSearchParams();

        if (category_id) params.append('category_id', category_id);
        if (fetch_all) params.append('fetch_all', "true");
        return `view-subcategories/?${params.toString()}`;
      },
      providesTags: ['Subcategory'],
    }),

    addCart: builder.mutation({
      query: (body) => ({
        url: `add-cart/`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Cart'],
    }),

    getCart: builder.query({
      query: () => `view-cart/`,
      providesTags: ['Cart'],
    }),
    deleteCart: builder.mutation({
      query: (body) => ({
        url: `delete-cart/`, // ✅ Make sure this matches your backend route
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['Cart'], // ✅ Match your actual tag names
    }),


    getBlog: builder.query({
      query: ({ page_size, page, post_id } = {}) => {
        const params = new URLSearchParams();

        if (post_id) params.append('post_id', post_id);
        if (page_size) params.append('page_size', page_size);
        if (page) params.append('page', page);

        return `view-blog/?${params.toString()}`;
      },
      providesTags: ['Blog'],
    }),

    getRating: builder.query({
      query: ({ theme_id } = {}) => {
        const params = new URLSearchParams();

        if (theme_id) params.append('theme_id', theme_id);


        return `view-ratings/?${params.toString()}`;
      },
      providesTags: ['Rating'],
    }),

    addOrder: builder.mutation({
      query: (formadata) => ({
        url: 'create-order/',  // your endpoint here
        method: 'POST',
        body: formadata,
      }),
      invalidatesTags: ['Cart'], // re-fetch GET data after add
    }),
    getOrder: builder.query({
      query: ({ fetch_all } = {}) => {
        const params = new URLSearchParams();

        if (fetch_all) params.append('fetch_all', fetch_all);


        return `view-order/?${params.toString()}`;
      },
      providesTags: ['Order'],
    }),

    addcontact: builder.mutation({
      query: (formadata) => ({
        url: 'add-contact/',  // your endpoint here
        method: 'POST',
        body: formadata,
      }),
      invalidatesTags: ['contact'], // re-fetch GET data after add
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,

  useGetThemesQuery,
  useGetCategoryQuery,
  useGetWhishlistQuery,
  useAddWishlistMutation,
  useDeleteWishlistMutation,
  useGetSubcategoryQuery,


  useAddCartMutation,
  useGetCartQuery,
  useDeleteCartMutation,


  useGetBlogQuery,
  useResetPasswordMutation,
  useGetUserQuery,
  useGetScriptQuery,
  useEditProfileMutation,
  useAddOrderMutation,
  useGetRatingQuery,
  useGetOrderQuery,
  
  useAddcontactMutation,


} = api;
