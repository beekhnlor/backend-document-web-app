const create = `
  INSERT INTO tax_applications (
    year_of_form,number,recipient_authority, subject_of_request,
    applicant_name, nationality, id_card_no, id_issue_date, applicant_tel, applicant_email, applicant_role,
    organization_name, organization_id_no, taxpayer_id_no,
    organization_tel, organization_mobile, fax, organization_pobox, organization_email, website,
    primary_profession, secondary_profession,
    accountant_name, accountant_contact, accountant_email,
    consultant_name, consultant_contract_no, consultant_contract_date, consultant_contract_value,
    consultant_tel, consultant_email,
    org_house_no, org_unit, org_street, org_village, org_district, org_province,
    proj_house_no, proj_unit, proj_street, proj_village, proj_district,proj_province
  ) VALUES (
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
    ?, ?,?
  )
`;

const read = `SELECT * FROM tax_applications `
const readById = `SELECT * FROM tax_applications WHERE id = ?`;

const update = `
  UPDATE tax_applications SET
    year_of_form = ?,number = ?, recipient_authority = ?, subject_of_request = ?,
    applicant_name = ?, nationality = ?, id_card_no = ?, id_issue_date = ?, 
    applicant_tel = ?, applicant_email = ?, applicant_role = ?,
    organization_name = ?, organization_id_no = ?, taxpayer_id_no = ?,
    organization_tel = ?, organization_mobile = ?, fax = ?, organization_pobox = ?, 
    organization_email = ?, website = ?,
    primary_profession = ?, secondary_profession = ?,
    accountant_name = ?, accountant_contact = ?, accountant_email = ?,
    consultant_name = ?, consultant_contract_no = ?, consultant_contract_date = ?, 
    consultant_contract_value = ?, consultant_tel = ?, consultant_email = ?,
    org_house_no = ?, org_unit = ?, org_street = ?, org_village = ?, 
    org_district = ?, org_province = ?,
    proj_house_no = ?, proj_unit = ?, proj_street = ?, proj_village = ?, 
    proj_district = ?, proj_province = ?
  WHERE id = ?
`;

const remove = `DELETE FROM tax_applications WHERE id = ?`;

const register  = `INSERT INTO tb_users ( user_name,password ) VALUE (?,?)`

const CheckUser = `SELECT user_name FROM tb_users WHERE user_name = ?`

const login = `SELECT user_name,password FROM tb_users WHERE user_name = ?`

const Company  = `INSERT INTO tb_company (company_name,	created_at,updated_at	) VALUE (?,?,?)`

const searchCompany = `SELECT * FROM tb_company WHERE company_name LIKE ?`

const getRecentCompanies =`SELECT * FROM tb_company ORDER BY created_at DESC LIMIT 3`

const uploadFlie = `INSERT INTO tb_file (files,created_at,updated_at) VALUE (?,?,?)`

const getFile = `SELECT * FROM tb_file`
const deleteFile = `DELETE FROM tb_file WHERE id = ?`;
const selectFileById = `SELECT files FROM tb_file WHERE id = ?`;


module.exports = {
  create,
  read,
  readById,
  update,
  remove,
  register,
  CheckUser,
  login,
  Company,
  searchCompany,
  getRecentCompanies,
  uploadFlie,
  getFile,
  deleteFile,
  selectFileById
};