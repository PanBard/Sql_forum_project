export const API_QUERY = {

    "cation_script_flow" : {
        "get" : "SELECT * FROM 	cation_script_flow",
        "add" : "INSERT INTO cation_script_flow (id,symbol,f1,f2,f3,f4,f5,f6,f7) VALUES (?,?,?,?,?,?,?,?,?)",
        "put" : "UPDATE cation_script_flow SET symbol=?,f1=?,f2=?,f3=?,f4=?,f5=?,f6=?,f7=? WHERE id=?",
        "delete" : "DELETE FROM cation_script_flow WHERE id=?"
    },

    "anion_script_flow" : {
        "get" : "SELECT * FROM 	anion_script_flow",
        "add" : "INSERT INTO anion_script_flow (id,symbol,f1,f2,f3,f4) VALUES (?,?,?,?,?,?)",
        "put" : "UPDATE anion_script_flow SET symbol=?,f1=?,f2=?,f3=?,f4=? WHERE id=?",
        "delete" : "DELETE FROM anion_script_flow WHERE id=?"
    },

    "cation_analysis_result" : {
        "get" : "SELECT id,name,f1,f2,f3,f4,f5,f6,f7, CONVERT(img1 USING utf8) as img1, CONVERT(img2 USING utf8) as img2, CONVERT(img3 USING utf8) as img3, CONVERT(img4 USING utf8) as img4, CONVERT(img5 USING utf8) as img5, CONVERT(img6 USING utf8) as img6, CONVERT(img7 USING utf8) as img7, end,result,user_id FROM cation_analysis_result",
        "add" : "INSERT INTO cation_analysis_result  (id,name,f1,f2,f3,f4,f5,f6,f7,img1,img2,img3,img4,img5,img6,img7,end,user_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        "put" : "UPDATE cation_analysis_result SET name=?,f1=?,f2=?,f3=?,f4=?,f5=?,f6=?,f7=?,img1=?,img2=?,img3=?,img4=?,img5=?,img6=?,img7=?,end=? WHERE id=?",
        "delete" : "DELETE FROM cation_analysis_result WHERE id=?",
        "set_end" : "UPDATE cation_analysis_result SET end=? WHERE id=?",
        "set_result" : "UPDATE cation_analysis_result SET result=? WHERE id=?"
    },

    "anion_analysis_result" : {
        "get" : "SELECT id,name,f1,f2,f3,f4, CONVERT(img1 USING utf8) as img1, CONVERT(img2 USING utf8) as img2, CONVERT(img3 USING utf8) as img3, CONVERT(img4 USING utf8) as img4, end,result,user_id FROM anion_analysis_result",
        "add" : "INSERT INTO anion_analysis_result (id,name,f1,f2,f3,f4,img1,img2,img3,img4,end,user_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
        "put" : "UPDATE cation_analysis_result SET name=?,f1=?,f2=?,f3=?,f4=?,img1=?,img2=?,img3=?,img4=?,end=? WHERE id=?",
        "delete" : "DELETE FROM anion_analysis_result WHERE id=?",
        "set_end" : "UPDATE anion_analysis_result SET end=? WHERE id=?",
        "set_result" : "UPDATE anion_analysis_result SET result=? WHERE id=?"
    },

     "cation_voice_script" : {
        "get" : "SELECT * FROM cation_voice_script",
        "add" : "INSERT INTO cation_voice_script (id,phase,f1,f2,f3,f4,f5,f6,f7,match_id,script) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
        "put" : "UPDATE cation_voice_script SET phase=?,f1=?,f2=?,f3=?,f4=?,f5=?,f6=?,f7=?,match_id=?,script=? WHERE id=?",
        "delete" : "DELETE FROM cation_voice_script WHERE id=?"
    },

    "cation_voice_script_en" : {
        "get" : "SELECT * FROM cation_voice_script_en",
        "add" : "INSERT INTO cation_voice_script_en (id,phase,f1,f2,f3,f4,f5,f6,f7,match_id,script) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
        "put" : "UPDATE cation_voice_script_en SET phase=?,f1=?,f2=?,f3=?,f4=?,f5=?,f6=?,f7=?,match_id=?,script=? WHERE id=?",
        "delete" : "DELETE FROM cation_voice_script_en WHERE id=?"
    },

    "anion_voice_script" : {
        "get" : "SELECT * FROM anion_voice_script",
        "add" : "INSERT INTO anion_voice_script (id,phase,f6,f7,match_id,script) VALUES (?,?,?,?,?,?)",
        "put" : "UPDATE anion_voice_script SET phase=?,f6=?,f7=?,match_id=?,script=? WHERE id=?",
        "delete" : "DELETE FROM anion_voice_script WHERE id=?"
    },

    "anion_voice_script_en" : {
        "get" : "SELECT * FROM anion_voice_script_en",
        "add" : "INSERT INTO anion_voice_script_en (id,phase,f6,f7,match_id,script) VALUES (?,?,?,?,?,?)",
        "put" : "UPDATE anion_voice_script_en SET phase=?,f6=?,f7=?,match_id=?,script=? WHERE id=?",
        "delete" : "DELETE FROM anion_voice_script_en WHERE id=?"
    },
    
    "test_images" : {
        "get" : "SELECT id, CONVERT(image USING utf8) as img, label FROM test_images",
        "add" : "INSERT INTO test_images (id,image,label) VALUES (?,?,?)",
        "put" : "UPDATE test_images SET image=?,label=? WHERE id=?",
        "delete" : "DELETE FROM test_images WHERE id=?"
    },

    "cation_analysis_result_texts" : {
        "get" : "SELECT * FROM 	c_analysis_texts",
        "add" : "INSERT INTO c_analysis_texts (id,f1,f2,f3,f4,f5,f6,f7) VALUES (?,?,?,?,?,?,?,?)",
        "put" : "UPDATE c_analysis_texts SET f1=?,f2=?,f3=?,f4=?,f5=?,f6=?,f7=? WHERE id=?",
        "delete" : "DELETE FROM c_analysis_texts WHERE id=?"
    },

    "anion_analysis_result_texts" : {
        "get" : "SELECT * FROM 	a_analysis_texts",
        "add" : "INSERT INTO a_analysis_texts (id,f1,f2,f3,f4) VALUES (?,?,?,?,?)",
        "put" : "UPDATE a_analysis_texts SET f1=?,f2=?,f3=?,f4=? WHERE id=?",
        "delete" : "DELETE FROM a_analysis_texts WHERE id=?"
    },

    "chat_messages" : {
        "get_all" : "SELECT * FROM 	chat_messages",
        "get_one_conversation" : "SELECT * FROM chat_messages WHERE chat_id=?",
        "add" : "INSERT INTO chat_messages (chat_id,message,ion,author,date) VALUES (?,?,?,?,now())",
        "delete" : "DELETE FROM chat_messages WHERE id=?",
        "mark_as_read" : "UPDATE chat_messages SET mark=? WHERE id=?",
    },

    "image_storage" : {
        "get" : "SELECT id, CONVERT(img USING utf8) as img, label,date FROM image_storage",
        "add" : "INSERT INTO image_storage (id,img,label,date) VALUES (?,?,?,now())",
        "put" : "UPDATE image_storage SET img=?,label=? WHERE id=?",
        "delete" : "DELETE FROM image_storage WHERE id=?"
    },

    // "account_credentials" : {
    //     "get_all" : "SELECT * FROM 	account_credentials",
    //     "add" : "INSERT INTO account_credentials (chat_id,message,ion,author,date) VALUES (?,?,?,?,now())",
    //     "delete" : "DELETE FROM account_credentials WHERE id=?",
    //     "mark_as_read" : "UPDATE account_credentials SET mark=? WHERE id=?",
    // }

}