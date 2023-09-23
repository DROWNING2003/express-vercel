const Express = require("express");
const yuml2svg = require("yuml2svg");
const mathjax = require("mathjax-node");


const router=Express.Router()
router.get("/",async (req, res)=>{
    const tex = req.query.tex;
    const yuml = req.query.yuml;
    const theme = req.query.theme;
    console.log(tex,yuml,theme);
    const errFn = (msg) => {
      res.status(404).send(msg);
    };
    const successFn = (result) => {
      res.set('Content-Type', 'image/svg+xml;charset=utf-8');
      res.status(200).send(result);
    };
    if (yuml){
        try {
            const v = await yuml2svg(yuml, { isDark: theme === "dark" });
            successFn(v);
          } catch (e) {
            errFn("Yuml formula is wrong!");
          }
    }else if (tex) {
        mathjax.typeset(
          {
            math: tex,
            format: "TeX",
            svg: true,
          },
          (data) => {
            if (theme === "dark") {
              data.svg = data.svg.replace(/fill="currentColor"/g, 'fill="#ffffff"');
            }
            successFn(data.svg);
          }
        );
      } else {
        errFn(
          "Please pass LaTeX formula via `tex` parameter or `Yuml` expression using `yuml` parameter."
        );
      }
})

module.exports=router
