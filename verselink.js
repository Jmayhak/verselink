var add_event = function() {
    function addEventIE(el, ev, fn) {
        return el.attachEvent('on' + ev, function(e) {
            return fn.call(el, e);
        });
    }

    function addEventW3C(el, ev, fn) {
        return el.addEventListener(ev, fn, false);
    }

    return window.addEventListener ? addEventW3C : addEventIE;
};

function get_coordinates(el)
{
    var _x = el.offsetLeft;
    var _y = el.offsetTop;
	var _width = el.offsetWidth;
	var _height = el.offsetHeight;
	//     while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
	// alert(el.offsetLeft);
	//         _x += el.offsetLeft;
	//         _y += el.offsetTop;
	//         el = el.parentNode;
	//     }
    return { top: _y, left: _x, width: _width, height: _height };
}

var create_popup = function(link)
{
	// Position the popup container
	var link_coordinates = get_coordinates(link);
	var popup_left = link_coordinates.left - 156 + (link_coordinates.width / 2) + "px";
	var popup_top = link_coordinates.top + link_coordinates.height + 6 + "px";

	// Configure the popup styles
	var popup_style = 'width: auto; position: absolute; left: ' + popup_left + '; top: ' + popup_top + '; z-index: 100;';
	var popup_contents_style = 'border: 6px solid black; border-radius: 6px; -webkit-border-radius: 6px; -moz-border-radius: 6px;';
	var header_style = 'background-color: black;';
	var iframe_style = 'width: 300px; height: 300px; border: 0;';

	// Create the popup container
	var div = document.createElement('div');
	div.setAttribute('class', 'yv_quick_ref_container');
	div.setAttribute('id', "yv_quick_ref_" + link.getAttribute('yv_quick_ref_id'));
	div.setAttribute('style', popup_style);


	// Get the mdot URL
	var mobile_link_href = link.href.replace(/http:\/\/(www\.)?/, "http://m.");
	mobile_link_href += "?view=mini";

	var html = '<div style="' + popup_contents_style + '">\n';
	html +=    '	<div style="' + header_style + '"></div>\n';
	html +=    '	<iframe style="' + iframe_style + '" src="' + mobile_link_href + '"></iframe>\n';
	//html +=    '    <div style="' + header_style + ' margin-top: 6px; text-align: right;"><a style="color: white; text-decoration: none;" rel="external" href="' + link.href + '">View on YouVersion &raquo;</a></div>\n';
	html +=    '</div>';
	//var div_html = '<a rel="external" href="' + link.href + '">View on YouVersion</a><iframe style="border: 0; width: 300px; height: 300px;" src="' + mobile_link_href + '" />';
	div.innerHTML = html;
	return div;
};

var toggle_quickref = function(link) {
    // Hide everybody
    var popups = document.querySelectorAll(".yv_quick_ref_container");
    for (var i = 0; i < popups.length; i++) {
        popups[i].style.display = "none";
    }

    // Check if the popup already exists
    var existing_popup = document.getElementById("yv_quick_ref_" + link.getAttribute('yv_quick_ref_id'));
    if (existing_popup != null) {
        // Then it already exists, just show it
        existing_popup.style.display = "block";
    }
    else {
        // Create it
        document.body.insertBefore(create_popup(link), document.body.childNodes[0]);
    }
    return false;
};

var hide_quickref = function() {
    // Hide everybody
    var popups = document.querySelectorAll(".yv_quick_ref_container");
    for (var i = 0; i < popups.length; i++) {
        popups[i].style.display = "none";
    }
};

function outerHTML(node) {
    // if IE, Chrome take the internal method otherwise build one
    return node.outerHTML || (
            function(n) {
                var div = document.createElement('div'), h;
                div.appendChild(n.cloneNode(true));
                h = div.innerHTML;
                div = null;
                return h;
            })(node);
}

var bible_books = [
    {
        "number":1,
        "osis":"Gen",
        "human":"Genesis",
        "chapters":50,
        "verses":[
            31,
            25,
            24,
            26,
            32,
            22,
            24,
            22,
            29,
            32,
            32,
            20,
            18,
            24,
            21,
            16,
            27,
            33,
            38,
            18,
            34,
            24,
            20,
            67,
            34,
            35,
            46,
            22,
            35,
            43,
            55,
            32,
            20,
            31,
            29,
            43,
            36,
            30,
            23,
            23,
            57,
            38,
            34,
            34,
            28,
            34,
            31,
            22,
            33,
            26
        ],
        "audio":false
    },
    {
        "number":2,
        "osis":"Exod",
        "human":"Exodus",
        "chapters":40,
        "verses":[
            22,
            25,
            22,
            31,
            23,
            30,
            25,
            32,
            35,
            29,
            10,
            51,
            22,
            31,
            27,
            36,
            16,
            27,
            25,
            26,
            36,
            31,
            33,
            18,
            40,
            37,
            21,
            43,
            46,
            38,
            18,
            35,
            23,
            35,
            35,
            38,
            29,
            31,
            43,
            38
        ],
        "audio":false
    },
    {
        "number":3,
        "osis":"Lev",
        "human":"Leviticus",
        "chapters":27,
        "verses":[
            17,
            16,
            17,
            35,
            19,
            30,
            38,
            36,
            24,
            20,
            47,
            8,
            59,
            57,
            33,
            34,
            16,
            30,
            37,
            27,
            24,
            33,
            44,
            23,
            55,
            46,
            34
        ],
        "audio":false
    },
    {
        "number":4,
        "osis":"Num",
        "human":"Numbers",
        "chapters":36,
        "verses":[
            54,
            34,
            51,
            49,
            31,
            27,
            89,
            26,
            23,
            36,
            35,
            16,
            33,
            45,
            41,
            50,
            13,
            32,
            22,
            29,
            35,
            41,
            30,
            25,
            18,
            65,
            23,
            31,
            40,
            16,
            54,
            42,
            56,
            29,
            34,
            13
        ],
        "audio":false
    },
    {
        "number":5,
        "osis":"Deut",
        "human":"Deuteronomy",
        "chapters":34,
        "verses":[
            46,
            37,
            29,
            49,
            33,
            25,
            26,
            20,
            29,
            22,
            32,
            32,
            18,
            29,
            23,
            22,
            20,
            22,
            21,
            20,
            23,
            30,
            25,
            22,
            19,
            19,
            26,
            68,
            29,
            20,
            30,
            52,
            29,
            12
        ],
        "audio":false
    },
    {
        "number":6,
        "osis":"Josh",
        "human":"Joshua",
        "chapters":24,
        "verses":[
            18,
            24,
            17,
            24,
            15,
            27,
            26,
            35,
            27,
            43,
            23,
            24,
            33,
            15,
            63,
            10,
            18,
            28,
            51,
            9,
            45,
            34,
            16,
            33
        ],
        "audio":false
    },
    {
        "number":7,
        "osis":"Judg",
        "human":"Judges",
        "chapters":21,
        "verses":[
            36,
            23,
            31,
            24,
            31,
            40,
            25,
            35,
            57,
            18,
            40,
            15,
            25,
            20,
            20,
            31,
            13,
            31,
            30,
            48,
            25
        ],
        "audio":false
    },
    {
        "number":8,
        "osis":"Ruth",
        "human":"Ruth",
        "chapters":4,
        "verses":[
            22,
            23,
            18,
            22
        ],
        "audio":false
    },
    {
        "number":9,
        "osis":"1Sam",
        "human":"1 Samuel",
        "chapters":31,
        "verses":[
            28,
            36,
            21,
            22,
            12,
            21,
            17,
            22,
            27,
            27,
            15,
            25,
            23,
            52,
            35,
            23,
            58,
            30,
            24,
            42,
            15,
            23,
            29,
            22,
            44,
            25,
            12,
            25,
            11,
            31,
            13
        ],
        "audio":false
    },
    {
        "number":10,
        "osis":"2Sam",
        "human":"2 Samuel",
        "chapters":24,
        "verses":[
            27,
            32,
            39,
            12,
            25,
            23,
            29,
            18,
            13,
            19,
            27,
            31,
            39,
            33,
            37,
            23,
            29,
            33,
            43,
            26,
            22,
            51,
            39,
            25
        ],
        "audio":false
    },
    {
        "number":11,
        "osis":"1Kgs",
        "human":"1 Kings",
        "chapters":22,
        "verses":[
            53,
            46,
            28,
            34,
            18,
            38,
            51,
            66,
            28,
            29,
            43,
            33,
            34,
            31,
            34,
            34,
            24,
            46,
            21,
            43,
            29,
            53
        ],
        "audio":false
    },
    {
        "number":12,
        "osis":"2Kgs",
        "human":"2 Kings",
        "chapters":25,
        "verses":[
            18,
            25,
            27,
            44,
            27,
            33,
            20,
            29,
            37,
            36,
            21,
            21,
            25,
            29,
            38,
            20,
            41,
            37,
            37,
            21,
            26,
            20,
            37,
            20,
            30
        ],
        "audio":false
    },
    {
        "number":13,
        "osis":"1Chr",
        "human":"1 Chronicles",
        "chapters":29,
        "verses":[
            54,
            55,
            24,
            43,
            26,
            81,
            40,
            40,
            44,
            14,
            47,
            40,
            14,
            17,
            29,
            43,
            27,
            17,
            19,
            8,
            30,
            19,
            32,
            31,
            31,
            32,
            34,
            21,
            30
        ],
        "audio":false
    },
    {
        "number":14,
        "osis":"2Chr",
        "human":"2 Chronicles",
        "chapters":36,
        "verses":[
            17,
            18,
            17,
            22,
            14,
            42,
            22,
            18,
            31,
            19,
            23,
            16,
            22,
            15,
            19,
            14,
            19,
            34,
            11,
            37,
            20,
            12,
            21,
            27,
            28,
            23,
            9,
            27,
            36,
            27,
            21,
            33,
            25,
            33,
            27,
            23
        ],
        "audio":false
    },
    {
        "number":15,
        "osis":"Ezra",
        "human":"Ezra",
        "chapters":10,
        "verses":[
            11,
            70,
            13,
            24,
            17,
            22,
            28,
            36,
            15,
            44
        ],
        "audio":false
    },
    {
        "number":16,
        "osis":"Neh",
        "human":"Nehemiah",
        "chapters":13,
        "verses":[
            11,
            20,
            32,
            23,
            19,
            19,
            73,
            18,
            38,
            39,
            36,
            47,
            31
        ],
        "audio":false
    },
    {
        "number":17,
        "osis":"Esth",
        "human":"Esther",
        "chapters":10,
        "verses":[
            22,
            23,
            15,
            17,
            14,
            14,
            10,
            17,
            32,
            3
        ],
        "audio":false
    },
    {
        "number":18,
        "osis":"Job",
        "human":"Job",
        "chapters":42,
        "verses":[
            22,
            13,
            26,
            21,
            27,
            30,
            21,
            22,
            35,
            22,
            20,
            25,
            28,
            22,
            35,
            22,
            16,
            21,
            29,
            29,
            34,
            30,
            17,
            25,
            6,
            14,
            23,
            28,
            25,
            31,
            40,
            22,
            33,
            37,
            16,
            33,
            24,
            41,
            30,
            24,
            34,
            17
        ],
        "audio":false
    },
    {
        "number":19,
        "osis":"Ps",
        "human":"Psalm",
        "chapters":150,
        "verses":[
            6,
            12,
            8,
            8,
            12,
            10,
            17,
            9,
            20,
            18,
            7,
            8,
            6,
            7,
            5,
            11,
            15,
            50,
            14,
            9,
            13,
            31,
            6,
            10,
            22,
            12,
            14,
            9,
            11,
            12,
            24,
            11,
            22,
            22,
            28,
            12,
            40,
            22,
            13,
            17,
            13,
            11,
            5,
            26,
            17,
            11,
            9,
            14,
            20,
            23,
            19,
            9,
            6,
            7,
            23,
            13,
            11,
            11,
            17,
            12,
            8,
            12,
            11,
            10,
            13,
            20,
            7,
            35,
            36,
            5,
            24,
            20,
            28,
            23,
            10,
            12,
            20,
            72,
            13,
            19,
            16,
            8,
            18,
            12,
            13,
            17,
            7,
            18,
            52,
            17,
            16,
            15,
            5,
            23,
            11,
            13,
            12,
            9,
            9,
            5,
            8,
            28,
            22,
            35,
            45,
            48,
            43,
            13,
            31,
            7,
            10,
            10,
            9,
            8,
            18,
            19,
            2,
            29,
            176,
            7,
            8,
            9,
            4,
            8,
            5,
            6,
            5,
            6,
            8,
            8,
            3,
            18,
            3,
            3,
            21,
            26,
            9,
            8,
            24,
            13,
            10,
            7,
            12,
            15,
            21,
            10,
            20,
            14,
            9,
            6
        ],
        "audio":false
    },
    {
        "number":20,
        "osis":"Prov",
        "human":"Proverbs",
        "chapters":31,
        "verses":[
            33,
            22,
            35,
            27,
            23,
            35,
            27,
            36,
            18,
            32,
            31,
            28,
            25,
            35,
            33,
            33,
            28,
            24,
            29,
            30,
            31,
            29,
            35,
            34,
            28,
            28,
            27,
            28,
            27,
            33,
            31
        ],
        "audio":false
    },
    {
        "number":21,
        "osis":"Eccl",
        "human":"Ecclesiastes",
        "chapters":12,
        "verses":[
            18,
            26,
            22,
            16,
            20,
            12,
            29,
            17,
            18,
            20,
            10,
            14
        ],
        "audio":false
    },
    {
        "number":22,
        "osis":"Song",
        "human":"Song of Solomon",
        "chapters":8,
        "verses":[
            17,
            17,
            11,
            16,
            16,
            13,
            13,
            14
        ],
        "audio":false
    },
    {
        "number":23,
        "osis":"Isa",
        "human":"Isaiah",
        "chapters":66,
        "verses":[
            31,
            22,
            26,
            6,
            30,
            13,
            25,
            22,
            21,
            34,
            16,
            6,
            22,
            32,
            9,
            14,
            14,
            7,
            25,
            6,
            17,
            25,
            18,
            23,
            12,
            21,
            13,
            29,
            24,
            33,
            9,
            20,
            24,
            17,
            10,
            22,
            38,
            22,
            8,
            31,
            29,
            25,
            28,
            28,
            25,
            13,
            15,
            22,
            26,
            11,
            23,
            15,
            12,
            17,
            13,
            12,
            21,
            14,
            21,
            22,
            11,
            12,
            19,
            12,
            25,
            24
        ],
        "audio":false
    },
    {
        "number":24,
        "osis":"Jer",
        "human":"Jeremiah",
        "chapters":52,
        "verses":[
            19,
            37,
            25,
            31,
            31,
            30,
            34,
            22,
            26,
            25,
            23,
            17,
            27,
            22,
            21,
            21,
            27,
            23,
            15,
            18,
            14,
            30,
            40,
            10,
            38,
            24,
            22,
            17,
            32,
            24,
            40,
            44,
            26,
            22,
            19,
            32,
            21,
            28,
            18,
            16,
            18,
            22,
            13,
            30,
            5,
            28,
            7,
            47,
            39,
            46,
            64,
            34
        ],
        "audio":false
    },
    {
        "number":25,
        "osis":"Lam",
        "human":"Lamentations",
        "chapters":5,
        "verses":[
            22,
            22,
            66,
            22,
            22
        ],
        "audio":false
    },
    {
        "number":26,
        "osis":"Ezek",
        "human":"Ezekiel",
        "chapters":48,
        "verses":[
            28,
            10,
            27,
            17,
            17,
            14,
            27,
            18,
            11,
            22,
            25,
            28,
            23,
            23,
            8,
            63,
            24,
            32,
            14,
            49,
            32,
            31,
            49,
            27,
            17,
            21,
            36,
            26,
            21,
            26,
            18,
            32,
            33,
            31,
            15,
            38,
            28,
            23,
            29,
            49,
            26,
            20,
            27,
            31,
            25,
            24,
            23,
            35
        ],
        "audio":false
    },
    {
        "number":27,
        "osis":"Dan",
        "human":"Daniel",
        "chapters":12,
        "verses":[
            21,
            49,
            30,
            37,
            31,
            28,
            28,
            27,
            27,
            21,
            45,
            13
        ],
        "audio":false
    },
    {
        "number":28,
        "osis":"Hos",
        "human":"Hosea",
        "chapters":14,
        "verses":[
            11,
            23,
            5,
            19,
            15,
            11,
            16,
            14,
            17,
            15,
            12,
            14,
            16,
            9
        ],
        "audio":false
    },
    {
        "number":29,
        "osis":"Joel",
        "human":"Joel",
        "chapters":3,
        "verses":[
            20,
            32,
            21
        ],
        "audio":false
    },
    {
        "number":30,
        "osis":"Amos",
        "human":"Amos",
        "chapters":9,
        "verses":[
            15,
            16,
            15,
            13,
            27,
            14,
            17,
            14,
            15
        ],
        "audio":false
    },
    {
        "number":31,
        "osis":"Obad",
        "human":"Obadiah",
        "chapters":1,
        "verses":[
            21
        ],
        "audio":false
    },
    {
        "number":32,
        "osis":"Jonah",
        "human":"Jonah",
        "chapters":4,
        "verses":[
            17,
            10,
            10,
            11
        ],
        "audio":false
    },
    {
        "number":33,
        "osis":"Mic",
        "human":"Micah",
        "chapters":7,
        "verses":[
            16,
            13,
            12,
            13,
            15,
            16,
            20
        ],
        "audio":false
    },
    {
        "number":34,
        "osis":"Nah",
        "human":"Nahum",
        "chapters":3,
        "verses":[
            15,
            13,
            19
        ],
        "audio":false
    },
    {
        "number":35,
        "osis":"Hab",
        "human":"Habakkuk",
        "chapters":3,
        "verses":[
            17,
            20,
            19
        ],
        "audio":false
    },
    {
        "number":36,
        "osis":"Zeph",
        "human":"Zephaniah",
        "chapters":3,
        "verses":[
            18,
            15,
            20
        ],
        "audio":false
    },
    {
        "number":37,
        "osis":"Hag",
        "human":"Haggai",
        "chapters":2,
        "verses":[
            15,
            23
        ],
        "audio":false
    },
    {
        "number":38,
        "osis":"Zech",
        "human":"Zechariah",
        "chapters":14,
        "verses":[
            21,
            13,
            10,
            14,
            11,
            15,
            14,
            23,
            17,
            12,
            17,
            14,
            9,
            21
        ],
        "audio":false
    },
    {
        "number":39,
        "osis":"Mal",
        "human":"Malachi",
        "chapters":4,
        "verses":[
            14,
            17,
            18,
            6
        ],
        "audio":false
    },
    {
        "number":40,
        "osis":"Matt",
        "human":"Matthew",
        "chapters":28,
        "verses":[
            25,
            23,
            17,
            25,
            48,
            34,
            29,
            34,
            38,
            42,
            30,
            50,
            58,
            36,
            39,
            28,
            27,
            35,
            30,
            34,
            46,
            46,
            39,
            51,
            46,
            75,
            66,
            20
        ],
        "audio":true
    },
    {
        "number":41,
        "osis":"Mark",
        "human":"Mark",
        "chapters":16,
        "verses":[
            45,
            28,
            35,
            41,
            43,
            56,
            37,
            38,
            50,
            52,
            33,
            44,
            37,
            72,
            47,
            20
        ],
        "audio":true
    },
    {
        "number":42,
        "osis":"Luke",
        "human":"Luke",
        "chapters":24,
        "verses":[
            80,
            52,
            38,
            44,
            39,
            49,
            50,
            56,
            62,
            42,
            54,
            59,
            35,
            35,
            32,
            31,
            37,
            43,
            48,
            47,
            38,
            71,
            56,
            53
        ],
        "audio":true
    },
    {
        "number":43,
        "osis":"John",
        "human":"John",
        "chapters":21,
        "verses":[
            51,
            25,
            36,
            54,
            47,
            71,
            53,
            59,
            41,
            42,
            57,
            50,
            38,
            31,
            27,
            33,
            26,
            40,
            42,
            31,
            25
        ],
        "audio":true
    },
    {
        "number":44,
        "osis":"Acts",
        "human":"Acts",
        "chapters":28,
        "verses":[
            26,
            47,
            26,
            37,
            42,
            15,
            60,
            40,
            43,
            48,
            30,
            25,
            52,
            28,
            41,
            40,
            34,
            28,
            41,
            38,
            40,
            30,
            35,
            27,
            27,
            32,
            44,
            31
        ],
        "audio":true
    },
    {
        "number":45,
        "osis":"Rom",
        "human":"Romans",
        "chapters":16,
        "verses":[
            32,
            29,
            31,
            25,
            21,
            23,
            25,
            39,
            33,
            21,
            36,
            21,
            14,
            23,
            33,
            27
        ],
        "audio":true
    },
    {
        "number":46,
        "osis":"1Cor",
        "human":"1 Corinthians",
        "chapters":16,
        "verses":[
            31,
            16,
            23,
            21,
            13,
            20,
            40,
            13,
            27,
            33,
            34,
            31,
            13,
            40,
            58,
            24
        ],
        "audio":true
    },
    {
        "number":47,
        "osis":"2Cor",
        "human":"2 Corinthians",
        "chapters":13,
        "verses":[
            24,
            17,
            18,
            18,
            21,
            18,
            16,
            24,
            15,
            18,
            33,
            21,
            14
        ],
        "audio":true
    },
    {
        "number":48,
        "osis":"Gal",
        "human":"Galatians",
        "chapters":6,
        "verses":[
            24,
            21,
            29,
            31,
            26,
            18
        ],
        "audio":true
    },
    {
        "number":49,
        "osis":"Eph",
        "human":"Ephesians",
        "chapters":6,
        "verses":[
            23,
            22,
            21,
            32,
            33,
            24
        ],
        "audio":true
    },
    {
        "number":50,
        "osis":"Phil",
        "human":"Philippians",
        "chapters":4,
        "verses":[
            30,
            30,
            21,
            23
        ],
        "audio":true
    },
    {
        "number":51,
        "osis":"Col",
        "human":"Colossians",
        "chapters":4,
        "verses":[
            29,
            23,
            25,
            18
        ],
        "audio":true
    },
    {
        "number":52,
        "osis":"1Thess",
        "human":"1 Thessalonians",
        "chapters":5,
        "verses":[
            10,
            20,
            13,
            18,
            28
        ],
        "audio":true
    },
    {
        "number":53,
        "osis":"2Thess",
        "human":"2 Thessalonians",
        "chapters":3,
        "verses":[
            12,
            17,
            18
        ],
        "audio":true
    },
    {
        "number":54,
        "osis":"1Tim",
        "human":"1 Timothy",
        "chapters":6,
        "verses":[
            20,
            15,
            16,
            16,
            25,
            21
        ],
        "audio":true
    },
    {
        "number":55,
        "osis":"2Tim",
        "human":"2 Timothy",
        "chapters":4,
        "verses":[
            18,
            26,
            17,
            22
        ],
        "audio":true
    },
    {
        "number":56,
        "osis":"Titus",
        "human":"Titus",
        "chapters":3,
        "verses":[
            16,
            15,
            15
        ],
        "audio":true
    },
    {
        "number":57,
        "osis":"Phlm",
        "human":"Philemon",
        "chapters":1,
        "verses":[
            25
        ],
        "audio":true
    },
    {
        "number":58,
        "osis":"Heb",
        "human":"Hebrews",
        "chapters":13,
        "verses":[
            14,
            18,
            19,
            16,
            14,
            20,
            28,
            13,
            28,
            39,
            40,
            29,
            25
        ],
        "audio":true
    },
    {
        "number":59,
        "osis":"Jas",
        "human":"James",
        "chapters":5,
        "verses":[
            27,
            26,
            18,
            17,
            20
        ],
        "audio":true
    },
    {
        "number":60,
        "osis":"1Pet",
        "human":"1 Peter",
        "chapters":5,
        "verses":[
            25,
            25,
            22,
            19,
            14
        ],
        "audio":true
    },
    {
        "number":61,
        "osis":"2Pet",
        "human":"2 Peter",
        "chapters":3,
        "verses":[
            21,
            22,
            18
        ],
        "audio":true
    },
    {
        "number":62,
        "osis":"1John",
        "human":"1 John",
        "chapters":5,
        "verses":[
            10,
            29,
            24,
            21,
            21
        ],
        "audio":true
    },
    {
        "number":63,
        "osis":"2John",
        "human":"2 John",
        "chapters":1,
        "verses":[
            13
        ],
        "audio":true
    },
    {
        "number":64,
        "osis":"3John",
        "human":"3 John",
        "chapters":1,
        "verses":[
            14
        ],
        "audio":true
    },
    {
        "number":65,
        "osis":"Jude",
        "human":"Jude",
        "chapters":1,
        "verses":[
            25
        ],
        "audio":true
    },
    {
        "number":66,
        "osis":"Rev",
        "human":"Revelation",
        "chapters":22,
        "verses":[
            20,
            29,
            22,
            11,
            14,
            17,
            17,
            13,
            21,
            11,
            19,
            17,
            18,
            20,
            8,
            21,
            18,
            24,
            21,
            15,
            27,
            21
        ],
        "audio":true
    }
];

function isReference(str) {
    var match = str.match(/^(Song\sof\sSolomon|(\d\s)?([A-Za-z]+))\s(\d+)(:(\d+)(-(\d+))?)?$/);
    if (match !== null) {
        // follows the right format
        if (match[2] !== undefined && !isNaN(parseFloat(match[2])) && isFinite(match[2])) {
            // 1 john 2:1
            for (var i in bible_books) {
                if (bible_books[i].human.toLowerCase() === match[2].toString() + match[3].toLowerCase() || bible_books[i].osis.toLowerCase() === match[2].toString() + match[3].toLowerCase()) {
                    // check if the chapter/verses are possible for the book
                    if (bible_books[i].chapters >= match[4]) {
                        // see if a start verse was passed
                        if (match[6] !== undefined) {
                            if (bible_books[i].verses[parseInt(match[4]) - 1] >= match[6]) {
                                // see if an end verse was passed
                                if (match[8] !== undefined) {
                                    if (bible_books[i].verses[parseInt(match[4]) - 1] >= match[6]) {
                                        return true;
                                    }
                                }
                                else {
                                    return true;
                                }
                            }
                        }
                        else {
                            return true;
                        }
                    }
                }
            }
        }
        else {
            // john 2:1
            for (var i in bible_books) {
                if (bible_books[i].human.toLowerCase() === match[1].toLowerCase() || bible_books[i].osis.toLowerCase() === match[1].toLowerCase()) {
                    // check if the chapter/verses are possible for the book
                    if (bible_books[i].chapters >= match[4]) {
                        // see if a start verse was passed
                        if (match[6] !== undefined) {
                            if (bible_books[i].verses[parseInt(match[4]) - 1] >= match[6]) {
                                // see if an end verse was passed
                                if (match[8] !== undefined) {
                                    if (bible_books[i].verses[parseInt(match[3]) - 1] >= match[5]) {
                                        return true;
                                    }
                                }
                                else {
                                    return true;
                                }
                            }
                        }
                        else {
                            return true;
                        }
                    }
                }
            }
        }

    }
    return false;
}

function getLink(str) {
    var match = str.match(/^(Song\sof\sSolomon|(\d\s)?([A-Za-z]+))\s(\d+)(:(\d+)(-(\d+))?)?$/);
    if (match !== null) {
        // follows the right format
        if (match[2] !== undefined && !isNaN(parseFloat(match[2])) && isFinite(match[2])) {
            for (var i in bible_books) {
                if (bible_books[i].human.toLowerCase() === match[2].toString() + match[3].toLowerCase() || bible_books[i].osis.toLowerCase() === match[2].toString() + match[3].toLowerCase()) {
                    // http://m.youversion.com/bible/verse/nkjv/col/3/14
                    var book = bible_books[i].osis;
                    var chapter = match[4];
                    var start_verse = (match[6] !== undefined) ? '/' + match[6] : '';
                    //var end_verse = (match[8] !== undefined) ? '/' + match[8] : '';
                    return 'http://www.youversion.com/bible/verse/cev/' + book + '/' + chapter + start_verse;
                }
            }
        }
        else {
            for (var i in bible_books) {
                if (bible_books[i].human.toLowerCase() === match[1].toLowerCase() || bible_books[i].osis.toLowerCase() === match[1].toLowerCase()) {
                    // http://m.youversion.com/bible/verse/nkjv/col/3/14
                    var book = bible_books[i].osis;
                    var chapter = match[4];
                    var start_verse = (match[6] !== undefined) ? '/' + match[6] : '';
                    //var end_verse = (match[8] !== undefined) ? '/' + match[8] : '';
                    return 'http://www.youversion.com/bible/verse/cev/' + book + '/' + chapter + start_verse;
                }
            }
        }
    }
}

function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    }
    else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}

addLoadEvent(function() {

    var paragraphs = document.querySelectorAll('p');
    var re = /(Song\sof\sSolomon|[A-Za-z])+\s\d+(:\d+(-\d+)?)?/g; // a general re to find instances of adsfadf 1, adsfadf 1:123, adafsdfa 11:11-23, and 1 asdfa 1:23 or song of solomon 1:23


    for (var i = 0; i < paragraphs.length; i++) {
        var node_length = paragraphs[i].childNodes.length;
        for (var j = 0; j < node_length; j++) {
            if (paragraphs[i].childNodes[j].nodeType === Node.TEXT_NODE) {
                // a safe place to replace text with a link. only replace text
                while ((matchInfo = re.exec(paragraphs[i].childNodes[j].nodeValue)) !== null) {     // search with our re
                    // check if the string is a reference
                    if (isReference(paragraphs[i].childNodes[j].nodeValue.substring(matchInfo.index - 2, matchInfo.index) + matchInfo[0]) === true) {
                        // 1 something 1:12 reference
                        var text_start = document.createTextNode(paragraphs[i].childNodes[j].nodeValue.substring(0, matchInfo.index - 2));
                        var text_end = document.createTextNode(paragraphs[i].childNodes[j].nodeValue.substring(re.lastIndex, paragraphs[i].childNodes[j].nodeValue.length));
                        var fragment = document.createDocumentFragment();
                        fragment.appendChild(text_start);
                        var link_string = document.createElement('a');
                        link_string.href = getLink(paragraphs[i].childNodes[j].nodeValue.substring(matchInfo.index - 2, matchInfo.index) + matchInfo[0]);
                        link_string.innerText = paragraphs[i].childNodes[j].nodeValue.substring(matchInfo.index - 2, matchInfo.index) + matchInfo[0];

                        s_text_start = paragraphs[i].childNodes[j].nodeValue.substring(0, matchInfo.index - 2);
                        s_text_end = paragraphs[i].childNodes[j].nodeValue.substring(re.lastIndex, paragraphs[i].childNodes[j].nodeValue.length);
                        s_text_link = paragraphs[i].childNodes[j].nodeValue.substring(matchInfo.index - 2, matchInfo.index) + matchInfo[0];
                        fragment.appendChild(link_string);
                        fragment.appendChild(text_end);

                        paragraphs[i].replaceChild(fragment, paragraphs[i].childNodes[j]);

                        node_length = paragraphs[i].childNodes.length;
                    }
                    else if (isReference(matchInfo[0]) === true) {
                        // something 1:12 reference
                        var text_start = document.createTextNode(paragraphs[i].childNodes[j].nodeValue.substring(0, matchInfo.index));
                        var text_end = document.createTextNode(paragraphs[i].childNodes[j].nodeValue.substring(re.lastIndex, paragraphs[i].childNodes[j].nodeValue.length));
                        var fragment = document.createDocumentFragment();
                        fragment.appendChild(text_start);
                        var link_string = document.createElement('a');
                        link_string.href = getLink(matchInfo[0]);
                        link_string.innerText = matchInfo[0];

                        s_text_start = paragraphs[i].childNodes[j].nodeValue.substring(0, matchInfo.index);
                        s_text_end = paragraphs[i].childNodes[j].nodeValue.substring(re.lastIndex, paragraphs[i].childNodes[j].nodeValue.length);
                        s_text_link = matchInfo[0];
                        fragment.appendChild(link_string);
                        fragment.appendChild(text_end);

                        paragraphs[i].replaceChild(fragment, paragraphs[i].childNodes[j]);

                        node_length = paragraphs[i].childNodes.length;
                    }
                    else {
                        //nothing
                    }

                }

            }
        }
    }

    var links = document.querySelectorAll("a");
    for (var i = 0; i < links.length; i++) {
        // Find links to youversion or bible.us
        if (links[i].hostname.match(/(youversion\.com)|(bible\.us)/)) {
            links[i].setAttribute('yv_quick_ref_id', i);
            if (window.addEventListener) {
                links[i].addEventListener("mouseover", function(e) {
                    toggle_quickref(this);
                    e.preventDefault();
                }, false);
            }
        }
    }

    document.body.addEventListener('click', function(e) {
        // iframes do not have a click event
        hide_quickref();
    });

});
