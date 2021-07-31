const express = require('express');
const cors = require('cors');
const { json } = require('body-parser');
const app = express();

app.use(cors())

app.get('/', async function (request, response) {
    const neo4j = require("neo4j-driver")
    const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "graph4j"))
    const session = driver.session()

    try {
        const results = await session.run(
            'MATCH (n:Hero) return n'
        )

        var heroesArray = new Array() 

        for(var i = 0; i < results.records.length; i++) {
            const hero = results.records[i].get(0)
            var obj = {
                name: hero.properties.name,
                main_attribute: hero.properties.main_attribute,
                base_str : hero.properties.base_str,
                base_agi : hero.properties.base_agi,
                base_int : hero.properties.base_int,
                str_gain : hero.properties.str_gain,
                agi_gain : hero.properties.agi_gain,
                int_gain : hero.properties.int_gain,
                attack_type : hero.properties.attack_type,
                complexity : hero.properties.complexity,
                min_base_demage : hero.properties.min_base_demage,
                max_base_demage : hero.properties.max_base_demage,
                attack_tick : hero.properties.attack_tick,
                attack_range : hero.properties.attack_range,
                projectile_speed : hero.properties.projectile_speed,
                base_armor : hero.properties.base_armor,
                magic_resistance : hero.properties.magic_resistance,
                move_speed : hero.properties.move_speed,
                turn_rate : hero.properties.turn_rate,
                day_vision : hero.properties.day_vision,
                night_vision : hero.properties.night_vision,
                carry_role : hero.properties.carry_role,
                disabler_role : hero.properties.disabler_role,
                escape_role : hero.properties.escape_role,
                support_role : hero.properties.support_role,
                jungler_role : hero.properties.jungler_role,
                pusher_role : hero.properties.pusher_role,
                nuker_role : hero.properties.nuker_role,
                durable_role : hero.properties.durable_role,
                initiator_role : hero.properties.initiator_role,
                base_hp : hero.properties.base_hp,
                hp_regen : hero.properties.hp_regen,
                base_mana : hero.properties.base_mana,
                mana_regen : hero.properties.mana_regen,
                description : hero.properties.description
            }
            heroesArray.push(obj)
        }
        response.json(heroesArray)

    } catch (ex) {
        console.log("Error!!!" + ex)
    } finally {
        await session.close()
        response.send()
    }

    await driver.close()
})

app.get('/:name', async function(request, response) {
    const neo4j = require("neo4j-driver")
    const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "graph4j"))
    const session = driver.session()

    try {
        const results = await session.run(
            "MATCH (n:Hero) WHERE n.name = '" + request.params.name + "' RETURN n"
        )

        var heroesArray = new Array() 

        for(var i = 0; i < results.records.length; i++) {
            const hero = results.records[i].get(0)
            var obj = {
                name: hero.properties.name,
                main_attribute: hero.properties.main_attribute,
                base_str : hero.properties.base_str,
                base_agi : hero.properties.base_agi,
                base_int : hero.properties.base_int,
                str_gain : hero.properties.str_gain,
                agi_gain : hero.properties.agi_gain,
                int_gain : hero.properties.int_gain,
                attack_type : hero.properties.attack_type,
                complexity : hero.properties.complexity,
                min_base_demage : hero.properties.min_base_demage,
                max_base_demage : hero.properties.max_base_demage,
                attack_tick : hero.properties.attack_tick,
                attack_range : hero.properties.attack_range,
                projectile_speed : hero.properties.projectile_speed,
                base_armor : hero.properties.base_armor,
                magic_resistance : hero.properties.magic_resistance,
                move_speed : hero.properties.move_speed,
                turn_rate : hero.properties.turn_rate,
                day_vision : hero.properties.day_vision,
                night_vision : hero.properties.night_vision,
                carry_role : hero.properties.carry_role,
                disabler_role : hero.properties.disabler_role,
                escape_role : hero.properties.escape_role,
                support_role : hero.properties.support_role,
                jungler_role : hero.properties.jungler_role,
                pusher_role : hero.properties.pusher_role,
                nuker_role : hero.properties.nuker_role,
                durable_role : hero.properties.durable_role,
                initiator_role : hero.properties.initiator_role,
                base_hp : hero.properties.base_hp,
                hp_regen : hero.properties.hp_regen,
                base_mana : hero.properties.base_mana,
                mana_regen : hero.properties.mana_regen,
                description : hero.properties.description
            }
            heroesArray.push(obj)
        }
        response.json(heroesArray)

    } catch (ex) {
        console.log("Error!!!" + ex)
    } finally {
        await session.close()
        response.send()
    }

    await driver.close()
})

app.listen(8080);
