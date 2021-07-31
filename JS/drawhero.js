document.addEventListener('DOMContentLoaded', function() {
    const information_section__div = document.getElementById("information-section")
    const stats_section = document.getElementById("stats-section")
    var HeroesList = new Array()

    var hero_name = window.localStorage.getItem("hero")

    fetch('http://localhost:8080/' + hero_name + '/', {
        method: "GET",
    }).then(response => response.json()).then(heroes => {
        HeroesList = heroes
        var selected_hero = HeroesList[0]
        document.title = "Dota 2 - " + selected_hero["name"].toUpperCase()

        FirstPart(information_section__div, selected_hero)
        SecondPart(stats_section, selected_hero)
    })
}, false)

function FirstPart(information_section__div, selected_hero) {


    const information = document.createElement("div")
        information.classList = "information"

        const hero_information = document.createElement("div")
        hero_information.classList = "hero-information"

        const hero_main_attribute = document.createElement("div")
        hero_main_attribute.classList = "hero-main-attribute"

        const att_picture = document.createElement("img")
        att_picture.setAttribute("src", "../Pictures/" + selected_hero["main_attribute"] + ".jpg")
        hero_main_attribute.appendChild(att_picture)

        const hero_label = document.createElement("label")
        hero_label.classList = "hero-label"
        if(selected_hero["main_attribute"] == "str")
            hero_label.innerHTML = "STRENGTH"
        else if(selected_hero["main_attribute"] == "agi")
            hero_label.innerHTML = "AGILITY"
        else
            hero_label.innerHTML = "INTELLIGENCE"

        hero_main_attribute.appendChild(hero_label)

        hero_information.appendChild(hero_main_attribute)

        const description = document.createElement("div")
        description.classList = "description"
        const description_label = document.createElement("label")
        description_label.classList = "description-label"
        var desc_text = selected_hero["description"]
        var desc_text_arr = desc_text.split("__")

        desc_text_arr.forEach(element => {
            description_label.innerHTML += element
            const br = document.createElement("br")
            const br2 = document.createElement("br")
            const br3 = document.createElement("br")
            description_label.appendChild(br)
            description_label.appendChild(br2)
            description_label.appendChild(br3)
        });

        description.appendChild(description_label)
        hero_information.appendChild(description)

        const attack_type = document.createElement("div")
        attack_type.classList = "attack-type"

        var att_type = (selected_hero["attack_type"] == "melee") ? "melee" : "range"
        const type_picture = document.createElement("img")
        type_picture.setAttribute("src", "../Pictures/" + att_type + ".jpg")
        attack_type.appendChild(type_picture)

        const hero_label2 = document.createElement("label")
        hero_label2.classList = "hero-label"
        hero_label2.innerHTML = att_type
        attack_type.appendChild(hero_label2)

        hero_information.appendChild(attack_type)

        const complexity = document.createElement("div")
        complexity.classList = "complexity"

        const hero_label3 = document.createElement("div")
        hero_label3.classList = "hero-label"
        hero_label3.innerHTML = "COMPLEXITY &nbsp&nbsp&nbsp"
        complexity.appendChild(hero_label3)

        var complexity_value = selected_hero["complexity"]
        
        for(var i = 0; i < complexity_value; i++) {
            const full_star = document.createElement("img")
            full_star.setAttribute("src", "../Pictures/full_star.png")
            complexity.appendChild(full_star)
        }

        for(var i = 0; i < (3 - complexity_value); i++) {
            const empty_star = document.createElement("img")
            empty_star.setAttribute("src", "../Pictures/empty_star.png")
            complexity.appendChild(empty_star)
        }

        hero_information.appendChild(complexity)

        const hero_portrait = document.createElement("div")
        hero_portrait.classList = "hero-portrait"

        const video = document.createElement("video")
        video.setAttribute("poster", "../Pictures/Portraits/" + selected_hero["name"].replaceAll(" ", "_") + ".jpg")
        video.setAttribute("autoplay", " ")
        video.setAttribute("preload", "auto")
        video.setAttribute("loop", " ")
        video.setAttribute("playsinline", " ")

        const source = document.createElement("source")
        source.setAttribute("type", "video/webm")
        source.setAttribute("src", "../Pictures/Animations/" + selected_hero["name"].replaceAll(" ", "_") + ".webm")
        video.appendChild(source)

        const video_img = document.createElement("img")
        video_img.setAttribute("src", "../Pictures/Portraits/" + selected_hero["name"].replaceAll(" ", "_") + ".jpg")
        video.appendChild(video_img)

        hero_portrait.appendChild(video)

        information.appendChild(hero_information)
        information.appendChild(hero_portrait)

        information_section__div.appendChild(information)

        const hr = document.createElement("hr")
        information_section__div.appendChild(hr)
}

function SecondPart(stats_section, selected_hero) {
    
    const hero_stats = document.createElement("div")
    hero_stats.classList = "hero-stats"

    const attributes = document.createElement("div")
    attributes.classList = "attributes"

    const hp_mana_stats = document.createElement("div")
    hp_mana_stats.classList = "hp-mana-stats"

    const hp_mana = document.createElement("div")
    hp_mana.classList = "hp-mana"

    const hero_img = document.createElement("img")
    hero_img.setAttribute("src", "../Pictures/Heroes/" + selected_hero["name"].replaceAll(" ","_") + ".jpg")
    hp_mana.appendChild(hero_img)

    const hp = document.createElement("div")
    hp.classList = "hp"

    const hp_label = document.createElement("label")
    hp_label.innerHTML = selected_hero["base_hp"] + " + " + selected_hero["hp_regen"]
    hp.appendChild(hp_label)

    const mana = document.createElement("div")
    mana.classList = "mana"

    const mana_label = document.createElement("label")
    mana_label.innerHTML = selected_hero["base_mana"] + " + " + selected_hero["mana_regen"]
    mana.appendChild(mana_label)

    hp_mana.appendChild(hp)
    hp_mana.appendChild(mana)

    hp_mana_stats.appendChild(hp_mana)

    const base_gain_stats = document.createElement("div")
    base_gain_stats.classList = "base-gain-stats"

    const str_gain_stats = document.createElement("div")
    str_gain_stats.classList = "str-gain-stats"

    const str_image = document.createElement("img")
    str_image.setAttribute("src", "../Pictures/str.jpg")
    str_gain_stats.appendChild(str_image)

    const str_label = document.createElement("label")
    str_label.innerHTML = selected_hero["base_str"] + " + "  + selected_hero["str_gain"]
    str_gain_stats.appendChild(str_label)

    const agi_gain_stats = document.createElement("div")
    agi_gain_stats.classList = "agi-gain-stats"

    const agi_image = document.createElement("img")
    agi_image.setAttribute("src", "../Pictures/agi.jpg")
    agi_gain_stats.appendChild(agi_image)

    const agi_label = document.createElement("label")
    agi_label.innerHTML = selected_hero["base_agi"] + " + "  + selected_hero["agi_gain"]
    agi_gain_stats.appendChild(agi_label)

    const int_gain_stats = document.createElement("div")
    int_gain_stats.classList = "int-gain-stats"

    const int_image = document.createElement("img")
    int_image.setAttribute("src", "../Pictures/int.jpg")
    int_gain_stats.appendChild(int_image)

    const int_label = document.createElement("label")
    int_label.innerHTML = selected_hero["base_int"] + " + "  + selected_hero["int_gain"]
    int_gain_stats.appendChild(int_label)

    base_gain_stats.appendChild(str_gain_stats)
    base_gain_stats.appendChild(agi_gain_stats)
    base_gain_stats.appendChild(int_gain_stats)

    hp_mana_stats.appendChild(base_gain_stats)

    attributes.appendChild(hp_mana_stats)

    hero_stats.appendChild(attributes)

    const vertical_line1 = document.createElement("div")
    vertical_line1.classList = "vertical-line"
    hero_stats.appendChild(vertical_line1)

    const roles = document.createElement("div")
    roles.classList = "roles"

    const roles_information = document.createElement("div")
    roles_information.classList = "roles-information"

    var roles_names = ["carry", "support", "nuker", "disabler", "jungler", "durable", "escape", "pusher", "initiator"]

    for(var i = 0; i < 9; i++) {
        const role = document.createElement("div")
        role.classList = "role"

        const role_label = document.createElement("label")
        role_label.classList = "role-label"
        role_label.innerHTML = roles_names[i]
        role.appendChild(role_label)

        const role_bar = document.createElement("div")
        role_bar.classList = "role-bar"

        const true_values = document.createElement("div")
        true_values.classList = "true-values"
        true_values.style.width = (selected_hero[roles_names[i] + "_role"] / 6 * 100) + "%"
        role_bar.appendChild(true_values)

        role.appendChild(role_bar)

        roles_information.appendChild(role)
    }

    roles.appendChild(roles_information)

    hero_stats.appendChild(roles)

    const vertical_line2 = document.createElement("div")
    vertical_line2.classList = "vertical-line"
    hero_stats.appendChild(vertical_line2)

    const stats_information = document.createElement("div")
    stats_information.classList = "stats-information"

    const stats_names = document.createElement("div")
    stats_names.classList = "stats-names"

    const attack_name = document.createElement("div")
    attack_name.classList = "attack-name"

    const attack_label = document.createElement("label")
    attack_label.innerHTML = "ATTACK"
    attack_name.appendChild(attack_label)

    const defense_name = document.createElement("div")
    defense_name.classList = "defense-name"

    const defense_label = document.createElement("label")
    defense_label.innerHTML = "DEFENSE"
    defense_name.appendChild(defense_label)

    const mobility_name = document.createElement("div")
    mobility_name.classList = "mobility-name"

    const mobility_label = document.createElement("label")
    mobility_label.innerHTML = "MOBILITY"
    mobility_name.appendChild(mobility_label)

    stats_names.appendChild(attack_name)
    stats_names.appendChild(defense_name)
    stats_names.appendChild(mobility_name)

    const stats_values = document.createElement("div")
    stats_values.classList = "stats-values"

    const attack = document.createElement("div")
    attack.classList = "attack"

    const attack_value1 = document.createElement("div")
    attack_value1.classList = "attack-value"

    const attack_image1 = document.createElement("img")
    attack_image1.setAttribute("src", "../Pictures/demage.png")
    attack_value1.appendChild(attack_image1)

    const attack_label1 = document.createElement("label")
    attack_label1.classList ="stats-value-label"
    attack_label1.innerHTML = selected_hero["min_base_demage"] + " - " + selected_hero["max_base_demage"]
    attack_value1.appendChild(attack_label1)

    const attack_value2 = document.createElement("div")
    attack_value2.classList = "attack-value"

    const attack_image2 = document.createElement("img")
    attack_image2.setAttribute("src", "../Pictures/attack_tick.png")
    attack_value2.appendChild(attack_image2)

    const attack_label2 = document.createElement("label")
    attack_label2.classList ="stats-value-label"
    attack_label2.innerHTML = selected_hero["attack_tick"]
    attack_value2.appendChild(attack_label2)

    const attack_value3 = document.createElement("div")
    attack_value3.classList = "attack-value"

    const attack_image3 = document.createElement("img")
    attack_image3.setAttribute("src", "../Pictures/attack_range.png")
    attack_value3.appendChild(attack_image3)

    const attack_label3 = document.createElement("label")
    attack_label3.classList ="stats-value-label"
    attack_label3.innerHTML = selected_hero["attack_range"]
    attack_value3.appendChild(attack_label3)

    const attack_value4 = document.createElement("div")
    attack_value4.classList = "attack-value"

    const attack_image4 = document.createElement("img")
    attack_image4.setAttribute("src", "../Pictures/projectile_speed.png")
    attack_value4.appendChild(attack_image4)

    const attack_label4 = document.createElement("label")
    attack_label4.classList ="stats-value-label"
    attack_label4.innerHTML = selected_hero["projectile_speed"]
    attack_value4.appendChild(attack_label4)

    attack.appendChild(attack_value1)
    attack.appendChild(attack_value2)
    attack.appendChild(attack_value3)
    attack.appendChild(attack_value4)

    const defense = document.createElement("div")
    defense.classList = "defense"

    const defense_value1 = document.createElement("div")
    defense_value1.classList = "defense-value"

    const defense_image1 = document.createElement("img")
    defense_image1.setAttribute("src", "../Pictures/base_armor.png")
    defense_value1.appendChild(defense_image1)

    const defense_label1 = document.createElement("label")
    defense_label1.classList ="stats-value-label"
    defense_label1.innerHTML = selected_hero["base_armor"]
    defense_value1.appendChild(defense_label1)

    const defense_value2 = document.createElement("div")
    defense_value2.classList = "defense-value"

    const defense_image2 = document.createElement("img")
    defense_image2.setAttribute("src", "../Pictures/magic_resistance.png")
    defense_value2.appendChild(defense_image2)

    const defense_label2 = document.createElement("label")
    defense_label2.classList ="stats-value-label"
    defense_label2.innerHTML = selected_hero["magic_resistance"] + " %"
    defense_value2.appendChild(defense_label2)

    defense.appendChild(defense_value1)
    defense.appendChild(defense_value2)

    const mobility = document.createElement("div")
    mobility.classList = "mobility"

    const mobility_value1 = document.createElement("div")
    mobility_value1.classList = "mobility-value"

    const mobility_image1 = document.createElement("img")
    mobility_image1.setAttribute("src", "../Pictures/move_speed.png")
    mobility_value1.appendChild(mobility_image1)

    const mobility_label1 = document.createElement("label")
    mobility_label1.classList ="stats-value-label"
    mobility_label1.innerHTML = selected_hero["move_speed"]
    mobility_value1.appendChild(mobility_label1)

    const mobility_value2 = document.createElement("div")
    mobility_value2.classList = "mobility-value"

    const mobility_image2 = document.createElement("img")
    mobility_image2.setAttribute("src", "../Pictures/turn_rate.png")
    mobility_value2.appendChild(mobility_image2)

    const mobility_label2 = document.createElement("label")
    mobility_label2.classList ="stats-value-label"
    mobility_label2.innerHTML = selected_hero["turn_rate"]
    mobility_value2.appendChild(mobility_label2)

    const mobility_value3 = document.createElement("div")
    mobility_value3.classList = "mobility-value"

    const mobility_image3 = document.createElement("img")
    mobility_image3.setAttribute("src", "../Pictures/vision.png")
    mobility_value3.appendChild(mobility_image3)

    const mobility_label3 = document.createElement("label")
    mobility_label3.classList ="stats-value-label"
    mobility_label3.innerHTML = selected_hero["day_vision"] + " / " + selected_hero["night_vision"]
    mobility_value3.appendChild(mobility_label3)

    mobility.appendChild(mobility_value1)
    mobility.appendChild(mobility_value2)
    mobility.appendChild(mobility_value3)

    stats_values.appendChild(attack)
    stats_values.appendChild(defense)
    stats_values.appendChild(mobility)

    stats_information.appendChild(stats_names)
    stats_information.appendChild(stats_values)

    hero_stats.appendChild(stats_information)

    const hero_stats_names = document.createElement("div")
    hero_stats_names.classList = "hero-stats-names"

    const attributes_name = document.createElement("div")
    attributes_name.classList = "attributes-name"

    const attributes_label = document.createElement("label")
    attributes_label.innerHTML = "ATTRIBUTES"
    attributes_name.appendChild(attributes_label)

    const vertical_line3 = document.createElement("div")
    vertical_line3.classList = "vertical-line"

    const roles_name = document.createElement("div")
    roles_name.classList = "roles-name"

    const roles_label = document.createElement("label")
    roles_label.innerHTML = "ROLES"
    roles_name.appendChild(roles_label)

    const vertical_line4 = document.createElement("div")
    vertical_line4.classList = "vertical-line"

    const stats_name = document.createElement("div")
    stats_name.classList = "stats-name"

    const stats_label = document.createElement("label")
    stats_label.innerHTML = "STATS"
    stats_name.appendChild(stats_label)

    hero_stats_names.appendChild(attributes_name)
    hero_stats_names.appendChild(vertical_line3)
    hero_stats_names.appendChild(roles_name)
    hero_stats_names.appendChild(vertical_line4)
    hero_stats_names.appendChild(stats_name)


    stats_section.appendChild(hero_stats)
    stats_section.appendChild(hero_stats_names)

    const hr = document.createElement("hr")
    stats_section.appendChild(hr)
}