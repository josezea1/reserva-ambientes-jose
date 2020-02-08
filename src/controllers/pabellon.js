const { Pabellon } = require('./../config/Sequelize');
// con el objeto pabellon se accedera a la base de datos desde el objeto pabellon
const getPabellones = (req, res) => {

    // select * FROM t_pabellon    
    Pabellon.findAll().then((pabellones) => {
        res.json({
            ok: true,
            pabellones: pabellones
        })
    });
}

const postPabellon = (req, res) => {
    let objPabellon = req.body.objPabellon;
    // forma 1: creando la instancia de un pabellon para guardarlo en la base de datos posteriormente 
    let objPab = Pabellon.build(objPabellon);
    objPab.save().then((pabellonCreado) => {
        res.status(201).json({
            ok: true,
            contenido: pabellonCreado,
            mensaje: 'El pabellon ha sido creado con exito'
        })
        // el send se usa para enviar una cadena de texto
        // res.send('ok');
    })

    // forma 2: crear y guardar una instancia de un pabellon en un  solo paso 
    // si se tiene un error en la creacion de objeto a la siguiete saltara su correlativo de la primarykey

    // pabellon.create(objPabellon).then((pabellonCreado)=>{
    //     res.status(201).json({
    //         ok:true,
    //         contenido:pabellonCreado,
    //         mensaje:'El pabellon ha sido creado con exito'
    //     })
    // })
}

const postPabellonConCreate = (req, res) => {
    // gracias a estructuracion de EMC6
    let { objPabellon } = req.body;
    Pabellon.create(objPabellon).then((pabellonCreado) => {
        res.status(201).json({
            ok: true,
            contenido: pabellonCreado,
            mensaje: 'El pabellon ha sido creado con exito'
        })
    })
}

const putPabellon = (req, res) => {
    let { id_pabellon } = req.params;
    let { objPabellon } = req.body;
    Pabellon.findByPk(id_pabellon).then((pabellon) => {
        console.log(pabellon);
        if (pabellon){
            return Pabellon.update(objPabellon,{
                where:{pab_id:id_pabellon}
            })
        }else{
            res.status(404).json({
                ok:false,
                contenido:null,
                mensaje:"no se encontro el pabellon"
            })
        }
    }).then(pabellonActualizado=>{
        res.status(200).json({
            ok:true,
            contenido:pabellonActualizado,
            mensaje:'el pabellon se actualizo correctamente'            
        })
    })
}

module.exports = {
    getPabellones: getPabellones,
    postPabellon: postPabellon,
    postPabellonConCreate,
    putPabellon
}
