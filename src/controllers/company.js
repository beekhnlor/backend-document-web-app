const connected = require('../connectdb/connectingdb')
const queries = require('../query/queries')



const create_company = async(req,res) =>{
    const { company_name } = req.body

    try{

        const [ result ] = await connected.query(queries.Company,[
            company_name,
            new Date(),
            new Date()
        ])

        if(result.affectedRows === 0) {
            return res.status(400).json({message:"Create Company Failed"})
        }

        return res.status(201).json({message:"Create Company Success"})

    }catch(err){
        console.log('Create Company Error',err)
        return res.status(500).json({message:"Internal Server Error"})
    }
}

const search_company = async (req, res) => {
    const { q } = req.query;

    try {
        if (!q) {
            
            const [ companies ] = await connected.query(queries.getRecentCompanies);
            return res.status(200).json(companies);

        } else {
            const searchTerm = `%${q}%`;
            const [ companies ] = await connected.query(queries.searchCompany, [searchTerm]);
            return res.status(200).json(companies);
        }

    } catch(err) {
        console.log('Search/Get Company Error', err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
module.exports = {
    create_company,
    search_company
}