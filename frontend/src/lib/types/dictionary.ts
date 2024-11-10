export type Dictionary =  {
    common: {
        autoTranslate: string,
        companyName: string,
        close: string,
        back: string,
        end: string,
        begin: string,
        save: string,
        or:string,
        no_data: string
    },
    supported_languages:{
        en:string,
        pl:string
    }
    ,
    components: {
        app: {
            error: string,
            empty: string,
            loading: string
        },
        header: {
            title: string,
            diskord: string,
            github: string
        },
        footer: {
            flaticons: string,
            libretranslate: string,
            github: string,
            models: string
        },
        message:{
            tryAgain: string,   
        },
        confidence: {
            error: string
        }

    },
    screens: {
        translator: {
            sourceInputPlaceholder: string
        }
    },
    start_page: {
        button_about: string,
        button_sign_in:string,
        button_sign_up: string,
        welcome_text_1: string,
        welcome_text_2: string,
        welcome_text_3: string
    },

    login_form: {
        succes_login: string,
        header: string,
        username: string,
        password: string,
        button_sign_in: string,
        button_scan: string,
        warn_wrong_username: string,
        warn_wrong_pass: string
    },
    registration_form: {
        succes_register_1: string,
        succes_register_2:string,
        header: string,
        username: string,
        password: string,
        first_name: string,
        last_name: string,
        email: string,
        confirm_password: string,
        button_register: string,
        warn_pass_not_match: string,
        warn_username_taken: string,
        warn_pass_empty: string,
        warn_username_empty: string,

    },
    dashboard_header: {
        analysis: string,
        database: string,
        forum: string,
        ph: string,
        face_recognition: string,
        others:string,
        user_id: string,
        dropdown_profile: string,
        dropdown_faceid: string,
        dropdown_ion: string,
        dropdown_ph: string,
        dropdown_help: string,
        dropdown_Settings: string,
        dropdown_signout: string,
    },
    analysis: {
        new_analysis: string,
        continue_analysis: string,
        cation_analysis: string,
        anion_analysis: string,
        enter_analysis_name: string,
        analysis_begin: string,
        propability: string,
        webcam_detection: string,
        anion_identification: string,
        cation_identification: string,
        analysis_name: string,
        analysis_progress: string,
        
        fake_analysis: string,
        choose_img: string,
        test_image: string,
        
        end_analysis: string,
        wrong_result: string,
        end_of_analysis: string,
        ion_found: string,
       
        chat_name: string,
        default_message:string


    },
    database_buttons: {
        ion_analysis:string,
        dataflow:string,
        anion: string,
        cation: string,
        voicescript: string,
        images: string,
        img_1:string,
        img_2:string,
        img_3:string,
        chat: string,
        users: string,
        ph: string,
    },

    databse: {
        clear_all_bt: string,
        remove_bt:string,
        mod_bt:string,
        entry_modification:string, //Modyfikacja wersetu nr:
        anion_analisys: string,
        cation_analysis: string,
        anion_scriptflow: string,
        cation_scriptflow: string,
        anion_voicescript: string,
        cation_voicescript: string,
        update_data: string,
        add_new: string,
        submit_bt:string,
        all_data_del_confirm: string,//"Na pewno chcesz usunąć całą historię?"
    },

    ph:{
        new_calibrations: string,
        prevoius_calibrations: string,
        saved_cal: string,
        cal_name: string,
        cal_begin: string,
        take_screenshot: string,
        preview: string,
        result: string,
        ph_table: string,
        p_value: string,
        file_from_device:string
    },

    face_recognition: {
        start_scan: string,
        open_webcam:string,
        close_webcam: string,
        age:string,
        gender:string,
        expression: string
    },

    about_page: {
        text_1: string,
        text_2: string,
        text_3: string,
        text_4: string
    },
    welcome_page: {
        text_1: string,
        text_2: string,
        forum_text:string
    },
    user_profile: {
        data_header: string,
        image_header: string,
        username: string,
        first_name: string,
        last_name: string,
        emial: string,
        phone: string,
        auth: string,
        password: string,
        date: string,
        accout_type: string
    },
    analysis_results_names:{
        zolty_p: string,
        fioletowy_p: string,
        pomaranczowy_p: string,
        cielisty: string,
        nieb_rozowy: string,
        niebieski: string,
        zielony: string,
        pomaranczowy: string,
        zolty: string,
        czarny: string,
        bialy: string,
        brak: string
    },
    user_settings: {
        lang_btn: string,
        apperance_btn: string,
        lang_header: string,
        apperance_header: string,
        EN_btn: string,
        PL_btn: string
    },

    user_help:{
        system_info: string,
        model_info: string,
    },

    user_faceid:{
        menu_btn:string,
        no_scan_btn: string,
        no_scan_text: string,
        scan_exist_btn: string,
        scan_exist_text: string

    }



}