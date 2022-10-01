    
const env = "https://localhost:44375/api"; 

export const apiPaths = {
    getIllnessesByUser: env.concat("/Illness/api/Illness/getuserilless"),
    addNotification: env.concat("/Notification/api/Notification/addNotificationUser"),
    getUser: env.concat("/Users/api/Users/get"),
    fetchQuestionnaireHistory: env.concat("/Questionnaire/api/Questionnaire/getUserQuestionnaireResults"),
    fetchNotifications: env.concat("/Notification/api/Notification/getUserNotifications"),
    login: env.concat("/Users/api/Users/login"),
    register: env.concat("/Users/api/Users/register"),
    getIllTypes: env.concat("/IllnessTypes/api/IllnessTypes"),
    getIllness: env.concat("/Illness/api/Illness"),
    addIllness: env.concat("/Illness"),
    addCustomIllness: env.concat("/Illness/api/Illness/addCustomIllnessUser"),
    deleteNotifications: env.concat("/Notification/api/Notification/deleteNotifications"),
    addQuestionnaireResponse: env.concat("/Questionnaire")
}