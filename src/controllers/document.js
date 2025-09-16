const connected = require("../connectdb/connectingdb");
const queries = require("../query/queries");
const fs = require('fs');
const path = require('path');
const create = async (req, res) => {
  const {
    year_of_form,
    number,
    recipient_authority,
    subject_of_request,
    applicant_name,
    nationality,
    id_card_no,
    id_issue_date,
    applicant_tel,
    applicant_email,
    applicant_role,
    organization_name,
    organization_id_no,
    taxpayer_id_no,
    organization_tel,
    organization_mobile,
    fax,
    organization_pobox,
    organization_email,
    website,
    primary_profession,
    secondary_profession,
    accountant_name,
    accountant_contact,
    accountant_email,
    consultant_name,
    consultant_contract_no,
    consultant_contract_date,
    consultant_contract_value,
    consultant_tel,
    consultant_email,
    org_house_no,
    org_unit,
    org_street,
    org_village,
    org_district,
    org_province,
    proj_house_no,
    proj_unit,
    proj_street,
    proj_village,
    proj_district,
    proj_province
  } = req.body;

  try {
    const [result] = await connected.query(queries.create, [
      year_of_form,
      number,
      recipient_authority,
      subject_of_request,
      applicant_name,
      nationality,
      id_card_no,
      id_issue_date,
      applicant_tel,
      applicant_email,
      applicant_role,
      organization_name,
      organization_id_no,
      taxpayer_id_no,
      organization_tel,
      organization_mobile,
      fax,
      organization_pobox,
      organization_email,
      website,
      primary_profession,
      secondary_profession,
      accountant_name,
      accountant_contact,
      accountant_email,
      consultant_name,
      consultant_contract_no,
      consultant_contract_date,
      consultant_contract_value,
      consultant_tel,
      consultant_email,
      org_house_no,
      org_unit,
      org_street,
      org_village,
      org_district,
      org_province,
      proj_house_no,
      proj_unit,
      proj_street,
      proj_village,
      proj_district,
      proj_province
    ]);

    if (!result.insertId) {
      return res.status(400).json({ message: "ບໍ່ສາມາດສ້າງເອກະສານໄດ້" });
    }

    return res.status(201).json({
      message: "ສ້າງເອກະສານສຳເລັດແລ້ວ",
      documentId: result.insertId,
    });
  } catch (err) {
    console.error("ເກີດຂໍ້ຜິດພາດໃນການສ້າງເອກະສານ:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
const read = async (req, res) => {
  try {
    const [result] = await connected.query(queries.read);

    return res.status(200).json({ message: "Read Document Success", result });
  } catch (err) {
    console.log("Read Document Error", err);
    return res.status(500).json({ message: "Internal Sever Error" });
  }
};
const readById = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await connected.query(queries.readById, [id]);

    if (result.length === 0) {
      return res.status(404).json({ message: "ไม่พบเอกสาร" });
    }

    return res
      .status(200)
      .json({ message: "Read Document Success", result: result[0] });
  } catch (err) {
    console.log("Read Document by ID Error", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const update = async (req, res) => {
  const { id } = req.params;

  const {
    year_of_form,
    number,
    recipient_authority,
    subject_of_request,
    applicant_name,
    nationality,
    id_card_no,
    id_issue_date,
    applicant_tel,
    applicant_email,
    applicant_role,
    organization_name,
    organization_id_no,
    taxpayer_id_no,
    organization_tel,
    organization_mobile,
    fax,
    organization_pobox,
    organization_email,
    website,
    primary_profession,
    secondary_profession,
    accountant_name,
    accountant_contact,
    accountant_email,
    consultant_name,
    consultant_contract_no,
    consultant_contract_date,
    consultant_contract_value,
    consultant_tel,
    consultant_email,
    org_house_no,
    org_unit,
    org_street,
    org_village,
    org_district,
    org_province,
    proj_house_no,
    proj_unit,
    proj_street,
    proj_village,
    proj_district,
    proj_province,
  } = req.body;

  try {
    const [result] = await connected.query(queries.update, [
      year_of_form,
      number,
      recipient_authority,
      subject_of_request,
      applicant_name,
      nationality,
      id_card_no,
      id_issue_date,
      applicant_tel,
      applicant_email,
      applicant_role,
      organization_name,
      organization_id_no,
      taxpayer_id_no,
      organization_tel,
      organization_mobile,
      fax,
      organization_pobox,
      organization_email,
      website,
      primary_profession,
      secondary_profession,
      accountant_name,
      accountant_contact,
      accountant_email,
      consultant_name,
      consultant_contract_no,
      consultant_contract_date,
      consultant_contract_value,
      consultant_tel,
      consultant_email,
      org_house_no,
      org_unit,
      org_street,
      org_village,
      org_district,
      org_province,
      proj_house_no,
      proj_unit,
      proj_street,
      proj_village,
      proj_district,
      proj_province,
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "ບໍ່ພົບຂໍ້ມູນທີ່ຈະແກ້ໄຂ" });
    }
    return res.status(200).json({ message: "ແກ້ໄຂຂໍ້ມູນສຳເລັດແລ້ວ" });
  } catch (err) {
    console.error("ເກີດຂໍ້ຜິດພາດໃນການແກ້ໄຂ:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await connected.query(queries.remove, [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "ບໍ່ພົບຂໍ້ມູນທີ່ຈະລົບ" });
    }
    return res.status(200).json({ message: "ລົບຂໍ້ມູນສຳເລັດແລ້ວ" });
  } catch (err) {
    console.error("ເກີດຂໍ້ຜິດພາດໃນການລົບ:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
const uploadFlie = async(req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files were uploaded." });
    }

    for (const file of req.files) {
      const filename = file.filename;

      // ส่ง originalname เข้าไปด้วย
      await connected.query(queries.uploadFlie, [
        filename,
        new Date(),
        new Date()
      ]);
    }

    return res.status(201).json({ 
      message: "Upload successful!",
    });

  } catch(err) {
    console.error('Upload File Error', err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
// ======================================================================

// ======================= แก้ไขฟังก์ชัน getFile =======================
const getFile = async(req,res)=>{
  try {
    // ดึงข้อมูลออกมาแล้วส่งกลับเป็น Array ตรงๆ
    const [ files ] = await connected.query(queries.getFile);
    return res.status(200).json(files); // << แก้ตรงนี้
  } catch(err) {
   console.error("Get File Error", err);
   return res.status(500).json({ message: "Internal Server Error" });
  }
}
// ======================================================================

// ======================= แก้ไขฟังก์ชัน deleteFile =======================
const deleteFile = async (req, res) => {
  const { id } = req.params;
  const connection = await connected.getConnection(); // ใช้ Transaction เพื่อความปลอดภัย

  try {
    await connection.beginTransaction();

    // 1. ค้นหาชื่อไฟล์จาก ID ในฐานข้อมูลก่อน
    const [fileRows] = await connection.query(queries.selectFileById, [id]);
    
    if (fileRows.length === 0) {
      await connection.rollback();
      return res.status(404).json({ message: "File not found in database" });
    }
    const filename = fileRows[0].files;

    // 2. ลบข้อมูลออกจากฐานข้อมูล *ก่อน*
    await connection.query(queries.deleteFile, [id]);

    // 3. ลบไฟล์จริงๆ ออกจาก Folder 'uploads'
    const filePath = path.resolve('./src/uploads', filename);
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
    } else {
      console.warn(`File not found on disk, but DB entry removed: ${filename}`);
    }

    await connection.commit(); // ยืนยันการเปลี่ยนแปลงทั้งหมด
    return res.status(200).json({ message: "File deleted successfully" });

  } catch (err) {
    await connection.rollback(); // ย้อนกลับถ้ามีข้อผิดพลาด
    console.error("Delete File Error", err);
    return res.status(500).json({ message: "Internal Server Error" });
  } finally {
    connection.release(); // คืน connection กลับสู่ pool
  }
};
module.exports = {
  create,
  read,
  readById,
  update,
  remove,
  uploadFlie,
  getFile,
  deleteFile
};
