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

module.exports = {
  create,
  read,
  readById,
  update,
  remove
};