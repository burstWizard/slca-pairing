import prisma from "../../lib/prisma"
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]"

export default async function handler(req, res) {

    const session = await unstable_getServerSession(req, res, authOptions)

    if (!session) {
        res.status(401).json({ message: "You must be logged in." });
        return;
    }

    const user = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
    })
    if(req.method == "POST"){
        //Handle both adding students and adding schools
        console.log(req.body.setting)
        if(req.body.setting == "student"){
            console.log("Trello")
            //handle student addition
            const player = await prisma.player.create({
                data:{
                    name: req.body.student,
                    schoolId: req.body.schoolId,
                    sectionId: req.body.sectionId
                }
            })
        }
        else{
            console.log("shit man")
            //handle school addition
            const school = await prisma.school.create({
                data:{
                    name: req.body.school,
                    sectionId: req.body.sectionId
                }
            })
        }
        res.status(200).json({message: "Hello"});
    }
    else{
        
        //Build the list of schools and players by first getting all schools involved with section then getting each student involved with school
        const schools = await prisma.school.findMany({
            where:{
                sectionId: req.query.sectionId
            }
        })

        const temp = [];

        for (const element of schools) {
            const players = await prisma.player.findMany({
                where: {
                schoolId: element.id,
                },
            });
            await temp.push([element, players]);
        }

        res.status(200).json({ roster: temp });
    }
}