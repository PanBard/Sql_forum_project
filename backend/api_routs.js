export const API_ROUTS = {

    "cation_script_flow" : {
        "get" : "/api/get/cation_script_flow",
        "post" : "/api/post/cation_script_flow",
        "put" : "/api/put/cation_script_flow",
        "delete" : "/api/delete/cation_script_flow/:id",
   },

   "anion_script_flow" : {
        "get" : "/api/get/anion_script_flow",
        "post" : "/api/post/anion_script_flow",
        "put" : "/api/put/anion_script_flow",
        "delete" : "/api/delete/anion_script_flow/:id",
},

   "cation_voice_script" : {
        "get" : "/api/get/cation_voice_script",
        "post" : "/api/post/cation_voice_script",
        "put" : "/api/put/cation_voice_script",
        "delete" : "/api/delete/cation_voice_script/:id",
        "get_required_script" : "/api/get/required_cation_voice_script"
},

"cation_voice_script_en" : {
    "get" : "/api/get/cation_voice_script_en",
    "post" : "/api/post/cation_voice_script_en",
    "put" : "/api/put/cation_voice_script_en",
    "delete" : "/api/delete/cation_voice_script_en/:id",
    "get_required_script" : "/api/get/required_cation_voice_script_en"
},

    "anion_voice_script" : {
        "get" : "/api/get/anion_voice_script",
        "post" : "/api/post/anion_voice_script",
        "put" : "/api/put/anion_voice_script",
        "delete" : "/api/delete/anion_voice_script/:id",
        "get_required_script" : "/api/get/required_anion_voice_script"
},

"anion_voice_script_en" : {
    "get" : "/api/get/anion_voice_script_en",
    "post" : "/api/post/anion_voice_script_en",
    "put" : "/api/put/anion_voice_script_en",
    "delete" : "/api/delete/anion_voice_script_en/:id",
    "get_required_script" : "/api/get/required_anion_voice_script_en"
},


    "cation_analysis_result" : {
        "get" : "/api/get/cation_analysis_result",
        "post" : "/api/post/cation_analysis_result",
        "put" : "/api/put/cation_analysis_result",
        "delete" : "/api/delete/cation_analysis_result/:id",
        "set_end" : "/api/put/cation_analysis_result/set_end",
        "set_result" : "/api/put/cation_analysis_result/set_result"
        
    },

    "anion_analysis_result" : {
        "get" : "/api/get/anion_analysis_result",
        "post" : "/api/post/anion_analysis_result",
        "put" : "/api/put/anion_analysis_result",
        "delete" : "/api/delete/anion_analysis_result/:id",
        "set_end" : "/api/put/anion_analysis_result/set_end",
        "set_result" : "/api/put/anion_analysis_result/set_result"
        
    },

    "cation_analysis_result_texts" : {
        "get" : "/api/get/cation_analysis_result_texts",
        "post" : "/api/post/cation_analysis_result_texts",
        "put" : "/api/put/cation_analysis_result_texts",
        "delete" : "/api/delete/cation_analysis_result_texts/:id",
   },

   "anion_analysis_result_texts" : {
        "get" : "/api/get/anion_analysis_result_texts",
        "post" : "/api/post/anion_analysis_result_texts",
        "put" : "/api/put/anion_analysis_result_texts",
        "delete" : "/api/delete/anion_analysis_result_texts/:id",
    },

    "shuffle" : {
        "get" : "/api/get/shuffle"
    },

  
    "custom_query" : {
        "get" : "/api/get/custom_query"
    },

    "test_images" : {
        "get" : "/api/get/test_images",
        "post" : "/api/post/test_images",
        "put" : "/api/put/test_images",
        "delete" : "/api/delete/test_images/:id",
},

"chat_messages" : {
    "get_all" : "/api/get/chat_messages",
    "get_one_conversation" : "/api/get/chat_messages/:id",
    "post" : "/api/post/chat_messages",
    "delete" : "/api/delete/chat_messages/:id",
    "put" : "/api/put/chat_messages",
},

"image_storage" : {
    "get" : "/api/get/image_storage",
    "post" : "/api/post/image_storage",
    "put" : "/api/put/image_storage",
    "delete" : "/api/delete/image_storage/:id",
},

"account_credentials" : {
    "get" : "/api/get/account_credentials",
    "post" : "/api/post/account_credentials",
    "put" : "/api/put/account_credentials",
    "delete" : "/api/delete/account_credentials/:id",
}





}