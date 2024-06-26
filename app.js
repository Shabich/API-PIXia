const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const db = require("./pg.js");
app.use(cors());
app.use(express.json());

const auth = async (req, res, next) => {
  try {
    const ssoNigend = req.headers["sso_nigend"];
    if (!ssoNigend) {
      return res.status(400).send("Header sso_nigend is missing");
    } else {
      const check = await db.query(
        `SELECT "rioNumber" FROM "authorization".t_user WHERE "rioNumber" = ${ssoNigend}`
      );
      if (check.rows.length > 0 && check.rows[0].rioNumber == ssoNigend) {
        next();
      } else {
        const getRio = await db.query(
          `SELECT tru.* , trs.departement_implantation
          FROM "authorization".t_refmi_user tru INNER JOIN "authorization".t_refmi_service trs ON tru.id_service_affectation=trs.id_service_rio
          WHERE nigend =${ssoNigend}`
        );
        const reqIns = `
        INSERT INTO "authorization".t_user
       ("rioNumber", nom, prenom, "isActif", creator, institution, "roleId", "createdAt", "updatedAt" , departement)
       VALUES (${getRio.rows[0].id_utilisateur_rio}, '${getRio.rows[0].nom}','${getRio.rows[0].prenom}', true, 999999, '${getRio.rows[0].institution}', 'HAB_000', now(), now(), '[${getRio.rows[0].departement_implantation}]')`;
        console.log(reqIns);
        await db.query(reqIns);

        next();
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
app.use(auth);

app.get("/", async (req, res) => {
  try {
    const ssoNigend = req.headers["sso_nigend"];
    const result = await db.query(
      'SELECT tm.menu, tm.libelle, tm.image_link, tm.description, tf.rionumber FROM "authorization"."t_menu" tm LEFT JOIN "authorization"."t_favorite" tf ON tm.menu = tf.menu'
    );
    const resultMapped = result.rows.map((appCard) => {
      return { ...appCard, isFavorite: appCard.rionumber == ssoNigend };
    });
    console.log(resultMapped);
    res.json(resultMapped);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
// app.get("/", async (req, res) => {
//   try {
//     const result = await db.query('SELECT * FROM "authorization"."t_menu"');
//     res.json(result.rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Internal Server Error");
//   }
// });
// app.get("/favorites", async (req, res) => {

//   try {
//     const ssoNigend = req.headers["sso_nigend"];
//     const result = await db.query(`SELECT * FROM "authorization".t_menu tm INNER JOIN "authorization".t_favorite tf ON tm.menu = tf.menu INNER JOIN "authorization".t_user ts ON tf.rionumber = ${ssoNigend}`
//   );
//     res.json(result.rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Internal Server Error");
//   }
// // });

// app.get("/favorites/:menu", async (req, res)=> {
//   const menu =req.params.menu;
//   const ssoNigend = req.headers["sso_nigend"];

//   try {
//     const result = await db.query(`SELECT * FROM "authorization".t_favorite WHERE menu = $1 AND rionumber = $2`, [menu, ssoNigend])
//     res.json({isFavorite: result.rows.length>0});
//   }catch (error){
//     console.error('Error checking favorite status', error);
//     res.status(500).send("Internal Server Error");
//   }
// })

app.post("/search", async (req, res) => {
  const query = req.body.q;

  if (!query) {
    return res.status(400).send('Query parameter "q" is required.');
  }
  try {
    const sqlQuery = `SELECT * FROM "authorization"."t_menu" WHERE LOWER(libelle) LIKE LOWER('%${query.toLowerCase()}%') OR LOWER(description) LIKE LOWER('%${query.toLowerCase()}%')`;
    const result = await db.query(sqlQuery);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/favorites", async (req, res) => {
  const { menu } = req.body;
  if (!menu) {
    return res.status(400).send('Body parameter "menu" is required.');
  }
  try {
    const ssoNigend = req.headers["sso_nigend"];
    await db.query(
      `INSERT INTO "authorization".t_favorite (menu, rionumber) VALUES ($1 ,$2)`,
      [menu, ssoNigend]
    );
    res.status(201).send("Favorite added");
  } catch (error) {
    console.error("Error adding favorite", error);
    res.sendStatus(500);
  }
});

app.delete("/favorites/:menu", async (req, res) => {
  const menu = req.params.menu;
  if (!menu) {
    return res.status(400).send('Body parameter "menu" is required for removing.');
  }
  try {
    await db.query(
      `DELETE FROM "authorization".t_favorite WHERE menu = $1 AND rionumber = $2`,
      [menu, req.headers["sso_nigend"]]
    );
    res.sendStatus(200);
  } catch (error) {
    console.error("Error removing favorite", error);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
