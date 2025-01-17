const VIEW_REGISTERED_USERS = "vru"; //VIEWREGISTEREDUSERS
const REGISTER_NEW_USER = "rnu";
const GET_ALL_DATABASE_DATA = "gadd";
const SUBMIT_HOURLY_PRODUCTION_REPORT = "shpr";
const VIEW_HOURLY_PRODUCTION_REPORT = "vhpr";

const LOGIN = "login";
const LOGOUT = "logout";

const EDIT_USER_INFO = "eui";
const GET_NOTIFICATIONS = "gn";
const REGISTER_MACHINE = "rm";
const GET_MACHINE_LIST= "gml";

const PM_ENDPOINT = "production_manager_endpoint";
const ADMIN_ENDPOINT = "admin_endpoint";
const LC_ENDPOINT = "line_chief_endpoint";

const VALID_USER_HASH = "VALID_USER_HASH";
const INVALID_USER_HASH = "INVALID_USER_HASH";

const SAVE_ASSEMBLY_LINE_LAYOUT = "sall";
const GET_ASSEMBLY_LINE_LAYOUT = "gall";
const GET_ASSEMBLY_LINE_LIST_FOR_PRODUCTIONID = "gallfp";

const UPDATE_ASEMBLY_LINE_INFO = "uali";
const DELETE_ASEMBLY_LINE = "dal";

const REGISTER_ASSEMBLY_LINE = "ral";
const GET_ASSEMBLY_LINE_LIST = "gallist";
const SUPERVISOR_ENDPOINT = "SUPERVISOR_ENDPOINT";

const START_NEW_PRODUCTION = "snp";
const GET_LINE_CHIEF_AND_ASSIGNED_LINE = "glcaal";
const GET_MACHINE_AND_ADDED_LINE = "gmaal";
const UPDATE_MACHINE_INFO = "umi";
const DELETE_MACHINE="dm";
const GET_UNUSED_MACHINE_LIST = "guml";
const GET_ASSIGNED_LINE_ID = "gali";
const GET_LAYOUT_FOR_GIVEN_LINEID = "glfgl";

const GET_CONGESTION_STATUS = "gcs";
const GET_PRODUCTION_ID_FOR_USER = "gpifu";

const PING = "ping";
const DELETE_USER = "du";
const SET_VIEWER_INFO = "svi"
const REQUEST_RESOURCE = "request-resource";
const SET_HOURLY_PRODUCTION = "set-hourly-production";
const ASSIGN_SUPERVISOR = "assign-supervisor";
const MARK_WORK_STATION = "mark-workstation";
const GET_GENERAL_PRODUCTION_INFO = "ggpi";

const GENERATE_PRODUCTION_REPORT = "gpr";
const DELETE_NOTIFICATION="delete-notification";
const GET_PRODUCTION_LIST = "get-production-list";

const GET_AVAILABLE_LC_LIST = "get-available-line-chief-list";
const GET_AVAILABLE_SUPERVISOR_LIST = "gasl";
const GENERATE_SYSTEM_START_MEMO = "gssm";
const SUBMIT_QUALITY_REPORT = "submit-quality-report";
const SUBMIT_CONGESTION_REPORT= "submit-congestion-report";
const GET_QUALITY_REPORTS = "get_quality_reports";
const VIEW_ASSEMBLY_LINE_ISSUES_REPORT = "get_assembly_line_issues_reports";
const GENERATE_QUALITY_REPORT = "generate_quality_report";
const GENERATE_ISSUES_REPORT = "generate-issues-report";
const GENERATE_SINGLE_HOURLY_PRODUCTION_MEMO = "generate-single-hourly-production-memo";

module.exports = {VIEW_REGISTERED_USERS, REGISTER_NEW_USER, GET_ALL_DATABASE_DATA, SUBMIT_HOURLY_PRODUCTION_REPORT, VIEW_HOURLY_PRODUCTION_REPORT, LOGIN, EDIT_USER_INFO, GET_NOTIFICATIONS, REGISTER_MACHINE, GET_MACHINE_LIST, PM_ENDPOINT, VALID_USER_HASH, INVALID_USER_HASH,ADMIN_ENDPOINT, LOGOUT, SAVE_ASSEMBLY_LINE_LAYOUT, GET_ASSEMBLY_LINE_LAYOUT, REGISTER_ASSEMBLY_LINE, GET_ASSEMBLY_LINE_LIST,LC_ENDPOINT, SUPERVISOR_ENDPOINT, PING, START_NEW_PRODUCTION, DELETE_USER, DELETE_ASEMBLY_LINE, UPDATE_ASEMBLY_LINE_INFO, GET_LINE_CHIEF_AND_ASSIGNED_LINE , GET_MACHINE_AND_ADDED_LINE, UPDATE_MACHINE_INFO, DELETE_MACHINE, GET_UNUSED_MACHINE_LIST, GET_ASSIGNED_LINE_ID, GET_LAYOUT_FOR_GIVEN_LINEID, GET_CONGESTION_STATUS, GET_PRODUCTION_ID_FOR_USER, SET_VIEWER_INFO, REQUEST_RESOURCE, SET_HOURLY_PRODUCTION, ASSIGN_SUPERVISOR, MARK_WORK_STATION, GET_GENERAL_PRODUCTION_INFO, GENERATE_PRODUCTION_REPORT, DELETE_NOTIFICATION,GET_PRODUCTION_LIST,GET_AVAILABLE_LC_LIST, GET_AVAILABLE_SUPERVISOR_LIST, GENERATE_SYSTEM_START_MEMO, SUBMIT_QUALITY_REPORT, SUBMIT_CONGESTION_REPORT, GET_QUALITY_REPORTS, VIEW_ASSEMBLY_LINE_ISSUES_REPORT, GENERATE_QUALITY_REPORT,GENERATE_ISSUES_REPORT, GENERATE_SINGLE_HOURLY_PRODUCTION_MEMO}
