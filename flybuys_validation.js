/*!
 * Fly Buys Card Validation
 * http://www.flybuys.co.nz/
 *
 * Copyright 2012, Loyalty NZ
 *
 * Date: Feb 2012
 */

var     FlyBuys = {

    _domain:    document.domain,
    valid:      function(card_number)
    {
        // Sanitise the card_number
        card_number = card_number.toString().replace(/[^0-9]+/, '');

        // Does it match 13 characters
        if ((card_number.split("").length) == 13)
        {
            return FlyBuys._valid_13digit(card_number);
        }

        // Does it match 16 characters
        if ((card_number.split("").length) == 16)
        {
            return FlyBuys._valid_16digit(card_number);
        }

        return false;
    },
    _valid_13digit: function(card_number)
    {
        var number_one = 0;
        var number_two = 0;

        for (i = 11; i > 0; i -= 2)
        {
            number_one += Number(card_number.substr(i,1));
        }

        number_one = number_one * 3;

        for (i = 0; i < 12; i += 2)
        {
            number_two += Number(card_number.substr(i,1));
        }

        number_two = number_one + number_two;

        var checkdigit = (10 - Number(number_two.toString().substr(1,1)));

        if(checkdigit == card_number.substr(12,1))
        {
            return true;
        }
        else
        {
            return false;
        };

        return true;
    },
    _valid_16digit: function(card_number)
    {

        var number_one = 0;
        var number_two = 0;

        for (i = 0; i < 14; i += 2)
        {
            number_one += Number(card_number.substr(i+1,1));
        }

        for (i = 0; i < 16; i += 2)
        {
            number_two += Number(FlyBuys._magic(card_number.substr(i,1)));
        }

        var checkdigit = 10 - (number_one + number_two) % 10;
        if (checkdigit == 10)
        {
            checkdigit = 0;
        }

        if(checkdigit == card_number.substr(15,1))
        {
            return true;
        }
        else
        {
            return false;
        }
    },
    _magic:     function(number)
    {
        number = number * 2;
        if (number > 9)
        {
                return number % 10 + (number - (number % 10)) / 10;
        } else {
                return number;
        }
    }

}