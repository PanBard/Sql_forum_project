import { Dictionary } from "lib/types/dictionary";

export const en_US: Dictionary = {
    common: {
        autoTranslate: 'Auto ',
        companyName: "AnalysisAI",
        close: "Close",
        back: "Back",
        end: "End",
        begin: "Begin",
        save: "save",
        or:"OR",
        no_data:"No data"
    },

    supported_languages:{
        en:'EN',
        pl:'PL'
    },
    components: {
        app: {
            error: 'Something went wrong',
            empty: 'No supported language',
            loading: 'Fetching supported languages...'
        },
        header: {
            title: "An application for simulating chemical analysis",
            diskord: "Discord",
            github: "Github"
        },
        footer: {
            flaticons: "FlatIcons",
            libretranslate: "LibreTranslate",
            github: "GitHub",
            models: "Models"
        },
        message:{
            tryAgain: 'Try again',   
        },
        confidence: {
            error: 'Something went wrong while auto detecting the language'
        }

    },
    screens: {
        translator: {
            sourceInputPlaceholder: 'Type text here...'
        }
    },
    start_page: {
        button_about: "About project",
        button_sign_in: "Sign in",
        button_sign_up: "Sign up",
        welcome_text_1: "Hi there!",
        welcome_text_2: "Our AI-powered platform drives innovation with tools that boost Qualitative Chemical Analysis.",
        welcome_text_3: "To use the app's services, you must log in or register."
    },

    login_form: {
        succes_login: "Welcome!",
        header: "Sign in",
        username: "Username",
        password: "Password",
        button_sign_in: "Log in",
        button_scan: "Log in with face identification",
        warn_wrong_username: "Wrong username",
        warn_wrong_pass: "Wrong password"
    },
    registration_form: {
        succes_register_1: "User ",
        succes_register_2: " successfully registered!",
        header: "Create a new user",
        username: "Username",
        password: "Password",
        first_name: "First Name",
        last_name: "Last Name",
        email: "Email",
        confirm_password: "Confirm Password",
        button_register: "Register",
        warn_pass_not_match: "Password does not match",
        warn_username_taken: "Username is already taken",
        warn_pass_empty: "Enter password",
        warn_username_empty: "Enter username",

    },
    dashboard_header: {
        analysis: "Ion analysis",
        database: "Databsae",
        forum: "Forum",
        ph: "pH analysis",
        face_recognition: "Face recognition",
        others:"Other",
        user_id: "User: ",
        dropdown_profile: "Your profile",
        dropdown_faceid: "Your Face ID",
        dropdown_ion: "Your ion analysis",
        dropdown_ph: "Your pH analysis",
        dropdown_help: "Help",
        dropdown_Settings: "Settings",
        dropdown_signout: "Sign out",
    },
    analysis: {
        new_analysis: "New analysis",
        continue_analysis: "Continue previous",
        cation_analysis: "Cation analysis",
        anion_analysis: "Anion analysis",
        enter_analysis_name: "Custom analysis name",
        analysis_begin: "Begin",
        propability: "Probability:        ",
        webcam_detection: "Webcam detection",
        anion_identification: "Anion identification",
        cation_identification: "Cation identification",
        analysis_name: "Analysis name: ",
        analysis_progress: "Analysis progress:",
        
        fake_analysis: "Make analysis",
        choose_img: "Choose img: ",
        test_image: "TEST IMAGES",
        
        end_analysis: "Analysis completed",
        end_of_analysis: "Congratulations, analysis completed successfully!",
        wrong_result: "Such a result should not appear at this stage of the analysis.",
        ion_found: "Found ion: ",
       
        chat_name: "Chat",
        default_message:"No messages"


    },
    database_buttons: {
        ion_analysis:"Ion analysis",
        dataflow:"Dataflow",
        anion: "Anions -",
        cation: "Cations +",
        voicescript: "VoiceScript",
        images: "Images",
        img_1:"Test images",
        img_2:"Images storage",
        img_3:"Face images",
        chat: "Chat messages",
        users: "Users",
        ph: "pH analysis",
    },

    databse: {
        clear_all_bt: "Clear all",
        remove_bt:"Remove",
        mod_bt:"Mod",
        entry_modification:"Modification of entry number ", //Modyfikacja wersetu nr:
        anion_analisys: "Anion analysis",
        cation_analysis: "Cation analysis",
        anion_scriptflow: "Anion dataflow",
        cation_scriptflow: "Cation dataflow",
        anion_voicescript: "Anion voicescript",
        cation_voicescript: "Cation voicescript",
        update_data: "Update data",
        add_new: "Add new",
        submit_bt:"Submit data to database",
        all_data_del_confirm: "Are you sure you want to delete all history?",//"Na pewno chcesz usunąć całą historię?"
    },

    ph:{
        new_calibrations: "New calibration",
        prevoius_calibrations: "Previous calibrations",
        saved_cal: "Saved pH calibrations:",
        cal_name: "Calibration name:",
        cal_begin: "Begin",
        take_screenshot: "Get frame sample",
        preview: "Preview: ",
        result: "Result: ",
        ph_table: "pH value table:",
        p_value: "Enter ph value",
        file_from_device:"Get file from device"
    },

    face_recognition: {
        start_scan: "Start scan",
        open_webcam:"Open Webcam",
        close_webcam: "Close Webcam",
        age:"Age: ",
        gender:"Gender: ",
        expression: "Expression: "
    },
    about_page: {
        text_1: "AnalysisAI is a one-page application that helps you in chemical analysis and allows you to better manage your laboratory. It uses custom image detection and image classification algorithms to distinguish chemical analysis results.",
        text_2: "The main functionality is a voice assistant that will guide you through the stages of chemical analysis. Everything you need in one place. Analysis progress is automatically saved in the database so you can always go back and re-trace the process. When you interrupt the analysis, you can resume it at any time.",
        text_3: "You can automate the comparison of pH test results obtained with test strips.",
        text_4: "The login system supports face recognition, so you can log in to the site only by scanning your face."
    },
    welcome_page: {
        text_1: "let's get started!",
        text_2: "To start chemical analysis of ions in solutions, select the Ion analysis button in the top bar.",
        forum_text:"Wstaw nowy wpis na forum!"
    },
    user_profile: {
        data_header: "Account information:",
        image_header: "Face photo:",
        username: "Username:",
        first_name: "Name:",
        last_name: "Surname:",
        emial: "Email:",
        phone: "Phone:",
        auth: "Authcode:",
        password: "Password:",
        date: "Registered at:",
        accout_type: "Account type"
    },
    analysis_results_names:{
        zolty_p: "yellow liquid",
        fioletowy_p: "purple liquid",
        pomaranczowy_p: "orange liquid",
        cielisty: "nude precipitate",
        nieb_rozowy: "blue-pink precipitate",
        niebieski: "blue precipitate",
        zielony: "green precipitate",
        pomaranczowy: "orange precipitate",
        zolty: "yellow precipitate",
        czarny: "dark precipitate",
        bialy: "white precipitate",
        brak: "no precipitate"
    },
    user_settings: {
        lang_btn: "Language",
        apperance_btn: "Apperance",
        lang_header: "Choose language:",
        apperance_header: "Apperance option:",
        EN_btn: "ENGLISH",
        PL_btn: "POLISH"
    },
    user_help:{
        system_info: "More information about the functionality and structure of the system: ",
        model_info: "Information about the custom models:",
    },

    user_faceid:{
        menu_btn:"Current scans",
        no_scan_btn: "Create a new scan",
        no_scan_text: "No Face ID",
        scan_exist_btn: "Change Scan",
        scan_exist_text: "Date of last scan: "

    }



}