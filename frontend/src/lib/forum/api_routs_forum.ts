const API_URL = "http://localhost:4111";
export const API_ROUTS = {
     "custom_query" : `${API_URL}/custom_query`,
     "get_all_users":`${API_URL}/users`,    
     "get_post_by_id":`${API_URL}/get_post_by_id/`,     
     "add_post":`${API_URL}/add_post_with_transaction`,
     "update_post_with_transaction":`${API_URL}/update_post_with_transaction`,     
     "add_comment":`${API_URL}/add_comment_with_transaction`,
     "get_comments_for_specific_post":`${API_URL}/specific_comments/`,
     "get_all_users_posts":`${API_URL}/user_posts/`,
     "get_all_users_comments":`${API_URL}/user_comments/`,
     "get_postsCount_for_user":`${API_URL}/postCount/`,
     "get_commentCount_for_user":`${API_URL}/commentCount/`,
     "get_posts_sorted_by_popularity":`${API_URL}/get_posts_sorted_by_comment_count`,
     "get_posts_sorted_by_date":`${API_URL}/get_posts_sorted_by_date`,
     "get_posts_sorted_by_category":`${API_URL}/get_posts_sorted_by_category/`,
     "delete_comment":`${API_URL}/delete_comment/`,
     "delete_post_and_related_comments":`${API_URL}/delete_post_and_related_comments/`,
     "delete_user_and_related_data":`${API_URL}/delete_user_and_related_data/`,
     "view_post_statistics":`${API_URL}/view_post_statistics/`,
     "get_summary_stats":`${API_URL}/get_summary_stats`,
     
     

     
}