import { APP_CONFIG } from "lib/config"


export const SERVER_ROUTS = {

     "add_new_user": `${APP_CONFIG.HOST}/users`,

     "cation_script_flow" : {
          "get" : `${APP_CONFIG.HOST}/api/get/cation_script_flow`,
          "post" : `${APP_CONFIG.HOST}/api/post/cation_script_flow`,
          "put" : `${APP_CONFIG.HOST}/api/put/cation_script_flow`,
          "delete" : `${APP_CONFIG.HOST}/api/delete/cation_script_flow`,
     },

     "anion_script_flow" : {
          "get" : `${APP_CONFIG.HOST}/api/get/anion_script_flow`,
          "post" : `${APP_CONFIG.HOST}/api/post/anion_script_flow`,
          "put" : `${APP_CONFIG.HOST}/api/put/anion_script_flow`,
          "delete" : `${APP_CONFIG.HOST}/api/delete/anion_script_flow`,
  },

     "cation_voice_script" : {
          "get" : `${APP_CONFIG.HOST}/api/get/cation_voice_script`,
          "post" : `${APP_CONFIG.HOST}/api/post/cation_voice_script`,
          "put" : `${APP_CONFIG.HOST}/api/put/cation_voice_script`,
          "delete" : `${APP_CONFIG.HOST}/api/delete/cation_voice_script`,
          "get_required_script" : `${APP_CONFIG.HOST}/api/get/required_cation_voice_script`
          },

          "cation_voice_script_en" : {
               "get" : `${APP_CONFIG.HOST}/api/get/cation_voice_script_en`,
               "post" : `${APP_CONFIG.HOST}/api/post/cation_voice_script_en`,
               "put" : `${APP_CONFIG.HOST}/api/put/cation_voice_script_en`,
               "delete" : `${APP_CONFIG.HOST}/api/delete/cation_voice_script_en`,
               "get_required_script" : `${APP_CONFIG.HOST}/api/get/required_cation_voice_script_en`
               },

     "anion_voice_script" : {
          "get" : `${APP_CONFIG.HOST}/api/get/anion_voice_script`,
          "post" : `${APP_CONFIG.HOST}/api/post/anion_voice_script`,
          "put" : `${APP_CONFIG.HOST}/api/put/anion_voice_script`,
          "delete" : `${APP_CONFIG.HOST}/api/delete/anion_voice_script`,
          "get_required_script" : `${APP_CONFIG.HOST}/api/get/required_anion_voice_script`
       },

       "anion_voice_script_en" : {
          "get" : `${APP_CONFIG.HOST}/api/get/anion_voice_script_en`,
          "post" : `${APP_CONFIG.HOST}/api/post/anion_voice_script_en`,
          "put" : `${APP_CONFIG.HOST}/api/put/anion_voice_script_en`,
          "delete" : `${APP_CONFIG.HOST}/api/delete/anion_voice_script_en`,
          "get_required_script" : `${APP_CONFIG.HOST}/api/get/required_anion_voice_script_en`
       },

     "cation_analysis_result" : {
          "get" : `${APP_CONFIG.HOST}/api/get/cation_analysis_result`,
          "post" : `${APP_CONFIG.HOST}/api/post/cation_analysis_result`,
          "put" : `${APP_CONFIG.HOST}/api/put/cation_analysis_result`,
          "delete" : `${APP_CONFIG.HOST}/api/delete/cation_analysis_result`,
          "set_end" : `${APP_CONFIG.HOST}/api/put/cation_analysis_result/set_end`,
          "set_result" : `${APP_CONFIG.HOST}/api/put/cation_analysis_result/set_result`
     },

     "anion_analysis_result" : {
          "get" : `${APP_CONFIG.HOST}/api/get/anion_analysis_result`,
          "post" : `${APP_CONFIG.HOST}/api/post/anion_analysis_result`,
          "put" : `${APP_CONFIG.HOST}/api/put/anion_analysis_result`,
          "delete" : `${APP_CONFIG.HOST}/api/delete/anion_analysis_result`,
          "set_end" : `${APP_CONFIG.HOST}/api/put/anion_analysis_result/set_end`,
          "set_result" : `${APP_CONFIG.HOST}/api/put/anion_analysis_result/set_result`
          
      },


     "shuffle_match" : {
          "get" : `${APP_CONFIG.HOST}/api/get/shuffle`,
          "delete" : "",
          "post" : "",
          "put" : ""
          },

    
          "custom_query" : `${APP_CONFIG.HOST}/custom_query`,
     // "custom_query" : {
     //      "get" : `${APP_CONFIG.HOST}/api/get/custom_query`,
     //      "delete" : "",
     //      "post" : "",
     //      "put" : ""
     //      },

     "test_images" : {
          "get" : `${APP_CONFIG.HOST}/api/get/test_images`,
          "post" : `${APP_CONFIG.HOST}/api/post/test_images`,
          "put" : `${APP_CONFIG.HOST}/api/put/test_images`,
          "delete" : `${APP_CONFIG.HOST}/api/delete/test_images`,
       },

       "chat_messages" : {
          "get_all" : `${APP_CONFIG.HOST}/api/get/chat_messages`,
          "get_one_conversation" : `${APP_CONFIG.HOST}/api/get/chat_messages`,
          "post" : `${APP_CONFIG.HOST}/api/post/chat_messages`,
          "delete" : `${APP_CONFIG.HOST}/api/delete/chat_messages`,
          "mark_message" : `${APP_CONFIG.HOST}/api/put/chat_messages`,
      },
      "image_storage" : {
          "get" : `${APP_CONFIG.HOST}/api/get/image_storage`,
          "post" : `${APP_CONFIG.HOST}/api/post/image_storage`,
          "put" : `${APP_CONFIG.HOST}/api/put/image_storage`,
          "delete" : `${APP_CONFIG.HOST}/api/delete/image_storage`,
      },



   




   
   


}