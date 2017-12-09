/*
--- Day 9: Stream Processing ---

A large stream blocks your path. According to the locals, it's not safe to cross the stream at the moment because it's full of garbage. You look down at the stream; rather than water, you discover that it's a stream of characters.

You sit for a while and record part of the stream (your puzzle input). The characters represent groups - sequences that begin with { and end with }. Within a group, there are zero or more other things, separated by commas: either another group or garbage. Since groups can contain other groups, a } only closes the most-recently-opened unclosed group - that is, they are nestable. Your puzzle input represents a single, large group which itself contains many smaller ones.

Sometimes, instead of a group, you will find garbage. Garbage begins with < and ends with >. Between those angle brackets, almost any character can appear, including { and }. Within garbage, < has no special meaning.

In a futile attempt to clean up the garbage, some program has canceled some of the characters within it using !: inside garbage, any character that comes after ! should be ignored, including <, >, and even another !.

You don't see any characters that deviate from these rules. Outside garbage, you only find well-formed groups, and garbage always terminates according to the rules above.

Here are some self-contained pieces of garbage:

<>, empty garbage.
<random characters>, garbage containing random characters.
<<<<>, because the extra < are ignored.
<{!>}>, because the first > is canceled.
<!!>, because the second ! is canceled, allowing the > to terminate the garbage.
<!!!>>, because the second ! and the first > are canceled.
<{o"i!a,<{i<a>, which ends at the first >.
Here are some examples of whole streams and the number of groups they contain:

{}, 1 group.
{{{}}}, 3 groups.
{{},{}}, also 3 groups.
{{{},{},{{}}}}, 6 groups.
{<{},{},{{}}>}, 1 group (which itself contains garbage).
{<a>,<a>,<a>,<a>}, 1 group.
{{<a>},{<a>},{<a>},{<a>}}, 5 groups.
{{<!>},{<!>},{<!>},{<a>}}, 2 groups (since all but the last > are canceled).
Your goal is to find the total score for all groups in your input. Each group is assigned a score which is one more than the score of the group that immediately contains it. (The outermost group gets a score of 1.)

{}, score of 1.
{{{}}}, score of 1 + 2 + 3 = 6.
{{},{}}, score of 1 + 2 + 2 = 5.
{{{},{},{{}}}}, score of 1 + 2 + 3 + 3 + 3 + 4 = 16.
{<a>,<a>,<a>,<a>}, score of 1.
{{<ab>},{<ab>},{<ab>},{<ab>}}, score of 1 + 2 + 2 + 2 + 2 = 9.
{{<!!>},{<!!>},{<!!>},{<!!>}}, score of 1 + 2 + 2 + 2 + 2 = 9.
{{<a!>},{<a!>},{<a!>},{<ab>}}, score of 1 + 2 = 3.
What is the total score for all groups in your input?

Your puzzle answer was 10050.

--- Part Two ---

Now, you're ready to remove the garbage.

To prove you've removed it, you need to count all of the characters within the garbage. The leading and trailing < and > don't count, nor do any canceled characters or the ! doing the canceling.

<>, 0 characters.
<random characters>, 17 characters.
<<<<>, 3 characters.
<{!>}>, 2 characters.
<!!>, 0 characters.
<!!!>>, 0 characters.
<{o"i!a,<{i<a>, 10 characters.
How many non-canceled characters are within the garbage in your puzzle input?

Your puzzle answer was 4482.
*/

const assert = require('assert');

const input = `{{{{},{{{<a!!!>aa!!!>,,,}!>!>!!eo!!a>},<'!!!>,<!>}!!!>u!'!>,<!!!>!>o!!!>,<'!!!>!!!!<{{i>},{{}},{{<i!!!>u{!!eu!!>}}},{{{{{<"!>},<!o!>},<<!!!!!!,!!i>},{<{!>},<ii'>},{{<,o!!<'!!"!!!>>,{}}}}},{}},{{}}}},{{{{<e!e,!a'!!!>}e"}>,{<o!>,<{<!>},<<!<'!!ia>}},{{},<'!!!>!!e<"{u!>},<<!!!!!}>}},{{{{<!!!>!!!!iu!!!>!!!>{<eu}i,!!!!!!>}},{{<>,<!!!!o!a"{!>},<i!>,<!!u!!a!>},<"!i!>},<}au!>!!o>}},{<!>},<e}iaae'}!>!,!>o{,e!!{!>>}},{<""!>!>a>,{<!{'u!!}{u,!>},<!>,<'}a>}},{{},{<}!!!>'o>}}},{{{<oi'<}!!!!>},<'!>},<u!>>},{<!!!!!!!>},<e!!!eu!>!o{'o,!!>,<{,oui'"!!"i!!!>},<<u}!!"aa!>,<>},{{{{<,'{'!>},<o}!>!>},<"!u!,!a!>},<"{>},<!>,<!{!>!!<oo}>}}}}},{{},{<<>},{}},{{{<!!!>},<,!'!!'u'!>},<!!ii!!!>i>},<!i!!}<'>},{{{<!!!!a!!!!a>}},{<!!!>aie!>>}},{{<}!!!>a!!i!>!!!!!>o!>,<>,{{<!<>}}}}},{{{{<{a!>,<!!!>!!u{!"o!>,<>,{<e!!o>}}}},{{{{<{e!!!!!!o{''!>,<>},{{{{},{<u!>},<!>,<!>>}},{}},{<>}},{{{<!!!>{!!o{}!!!>,,!>'u"'!!}!><!!!>>},{<!!!>ou!>},<!>ui,!!}{!!!>!>,<"{!!!>},<>}},{{<oa!!!>u!{u!''ae<e>},{{<uu!!!><!!!>>}}}}}},{{{{<!!!!{<}''">,<}!>},<!>},<!>},<!!!>!!!!!!}!o!>},<}a>},{{{<e'"iau!>},<>,{<!!!>ie!!!>!!!>,<!!i<!!!>o!eu<'{>}},{<,a!!!>!>},<!!!!!>,a!>!!e!!!>},<ui!}>,{<!>},<aao'!>},<ea!!!>,<>}}},{{},{}}},{}},{{{<!'}!ei>}},{<!!!>,<!!u'}>,{<!>},<o}iu<!>>}}},{{{{}},<"{"!>},<!>!>},<i!>},<{}u>},{{{{{<e'!!u<!!!>o"<<!!u!>,<{"!oe!>,<!u>}},<ae!!!!!>!>},<!>,<!!!>{>}}}},{{{},{<"{o"}"<!!!>}>,{<!>},<!!!!!>ee{!!!!!>iu>}},{{<,!>a!!u!!u<"{!>},<!>},<,!",i!!e{>},{<ue}e!!,oa!>},<"!>},<!!o>}}},{{{{<!>{!>,<!e'i!!<!!!!!e>},{{{}}}},{{<"!!'!!!>oo}}''!!!!!>!!!>},<ii''>},{{<!!!>u!!a!>!!'o!!!>,<i!>!!!!<',o}>}}}},{{{{},{{<}}'i"u!!!>,<}!!!!{!e}!!u"!!!>>},{<,i!>},<!>{i!i{!o<"oe!!u!>i>}}}},{{{<<a!><>,<{e!,!><!!iaei!!e,<o!>},<!o>}},{{<}!o}!!i!>!!o}o!!!>oeia'!">,{}},{<!>,<!>,<{o}ia!>},<!>!>},<""!i'>},{<i!!e!!!>!!!>o!e>}},{{{{<{!!!>,<!>u''>},{}}},{{{{<}!{!>,<!>,<!!!>a!>},<}!>!!!>>},{{{<a"o!>!a!!!!<!!i<i'"!!!uu>},{<i!>,<oii",!>!o>}}}},{{{}},{<e!>!!!>uau!>,<}!!u!!!>!!!>!>,<eo>,<}!!!''a'a!!!>'!!!>!>},<e,,!>},<'<!>,<<>},{{{<u!>},<!u{!>,<!>},<!!"!>>},<e!{!!!!>}}},{{<"!!i!,'<',u,!!"'aa}!>>,<'a!>},<!>},<{aa,!<!!!!u!>!>,<!>,<!>!>,<<>},{{<>},{<a'!>!>},<'!uu,o!>,<<"!>,<!>},<!,!!!!>}},{{<i!ie!>},<!>!>,<!!e",oi,!>'<<!!>,{{<>},{}}}}},{}},{{},{<!"o>,{<u!!,!!!>'i!!{ea!>"!>,<!!!>!a{>}},{<!>,<!!<'!!!!e!!'!>,<!!,!>,<<!>,<!!!>ua{>}},{{{},{{}}},{{<!>oia!>!>},<!!!>},<i"!!}>},{<a!!!>,<>}}},{{{{{<!!!>!!"!!!!,,a!!!>i}e{!>},<!!!!au!>,<o!>,<!!,>,<!!}!>,<!!"<!!}i!!!>u!>},<i!>,<!>>},{{{{<e<<{!>!"!>},<"}',}<e<!,>},<a!><}ua>}},<ea!!!>!>},<'o'<!u"u">}},<!e!!!!!!"}>}},{<!>},<!>{a>},{}}},{{{},<u<!!u!>>}},{{{{{<!,"'!}o!!!e!>!!e"ee>}},<o!u<{!!u<!{!>!>",{a"{}>},{{<}}!!!!!>!!!>,<"!>},<uuou,{,>},{<!>},<!!!!o!>},<!a!!!><e>}},{<!{!!u!ee!>,<!>,<!!,{{ia}a"!!,!>>,<>}},{{{{<!>,<!!!>e>}},{<a!!'iiaa<!a!!'o!>!>!!!>,<{>},{{{},{{<!!!!!!oa}<!>!e'ia!>!>},<{e}!!a!"!>,<o<>},{<'!}"e>}}}}},{{<!>},<}!>},<i!>!a!!!>,!!!>,<,!>},<e}>},{},{<>}},{{{{<e!>>,<!!!!!>},<!>,<ee{e'}>},{<!!e!!!><!>,<,!<{!>{>}}},{{<!!"!>},<!!!>,<,!!"uu>}}},{{<!'o"!!!>!>,<e!>,<!!o{!!!!!!!>!!!!!!!>{!>},<>,<uo"!>},<!oe!'!!a>},{{<,!>!!>,<!!e<,}i,!!>},{{{<'e,<<}!!{!!io!>},<>}}},{{}}},{}}},{{{{{}}},{<}!!e!!}!>!>},<"!,'{!!!>>,{<!o>}}},{{{{{{{<,,{,ei!!!>},<'!>,<"!>,<u}!!u>},{<}!"!!!>,<ooe!!e!!ai}!!"i>}}}},<!>!>},<!>},<!!'>},{<!>},<!>!>,<<i!!!>!>">},{{<!>,<{i!>},<!}!>'!!i{"!<>,<'!!!!!>,<a{eo'a{<>},{{},{}}}},{{{},{{{<oe!>,<!!!>e'!!!!!>}}{!ia!u>}},{{<!>,<,,!><!'}"a!!!>e!!!>>,<<!>,<!!!!'}!>},<a!!!>o">}},{{{<!!!!{i!!"!!!>!!}!!!!!>e>},<!!!!!>{i!!!>e!'o!!e!!!>"'!!{!!u>},{{<!"!>">},<}!!!>u!!!!!>"ie>},{<,!o'!>,<"!>,<'>,{<!!!>!>>}}}},{<}<!!!uu>,{<"o}<!!!>,<}o!!!e!>au>}}},{},{{{<!!!>!>!!!!!>'!!!!!>!,a,o!uo,!>,<!>},<!>},<o>},{}},{<!!!>},<!>>,<au!!!>},<!u,!!!!!<{!>},<'!>,<!o<<i!!!!o>},{<>,{<ei!aa!'{!e!>},<{>}}},{{{<!!!e,u!>}!>},<!!!>,<!!!>,<!!!!a!>!!!!!>},<!!!>>}},{{<i}'{!!o,u{"!>},<"{iauu{>},{}},{{{{<o!!!>!!!"!>},<!",!!!>}o"e>,{<!>},<!!,>}},{}},{}}}}},{{{<'!>},<!!!>!>!!'}>}},{{<!!u!>,<'!!!!!!!>,<oe{"!>',!!!>u!>i<!o,>},{},{<}},!,'>,{{{<,a!{{!!u!!!>!!!>>}},<o>}}},{{<"!>},<e!>},<u"!!u<eui>}}},{{{{},{{{},<!>!!ie,ie}ao!>,<u>},{<,!!,aoa!>},<!!!><!!!>!!!>!>!o!>},<i!!!>i>}}},{<!>},<>,<e!e!!},}!!!>aa>},{<,i}!!!!,!>a!u'i!!!!!>u!>e}!>},<<!!!>},<>}}}},{{{<,!>,<e"{<e'!!{!!e!!!!!!!>!!o!>},<u"i,!!,>,<!!i!>},<e!!!!u!"!!!>!>u!o!!!>},<<<>},{{{<,!,>}},{<!!!!!!!!a{!>,<u,e>}}},{<!>},<!>!>,<!!!>!a!!!!!<>,{<,'<e!!!!}o}{!!!>,<!!i<}e!!e>}},{<!!!>!!,!!i"{<"'>,{<}{!!'<{!>,<!>!>,<i!>},<!><!!!>>}}},{{<!a!>'!!!>!u!!!>,>}}},{}}},{{{}},{{{},<a!!!>{"!!,!!e'!>>},{}},{{<{<i"o!!!!"i!!u!>,<"!>},<e>},{}}}},{{{<}!!,u',oa!!!><"!!,!>},<!!>},{<!>o!!o!>},<!>,<}!!!>>}},{<!!!!u}u!!!>>},{{},<!!!!!>},<'u!<!<!!<!>},<!!!<ae!>>}}},{{{<"oea!,!!!>"!>,<u!>a'{"o!!!>>,<i,!<iu!a<{,>},{<!>},<<i!>!!!>,e,}"!>},<!}!>!!ou!>,<u!!!!i>,{<!>,<!>},<oo},oo,!>"!!'<e>}}},{<o>}},{{{<i!!!aoo!>,<!e!>},<e,e!>},<!!!!!!!>o!>},<>},{<o!!i!!!!e!!{,!!!!!>},<,oi,!!u!!!>!!a>}},{<o{!>!!!>},<'}u!!!!!><!!!>!!!>>,<!>!!{!e<e!!!>!!!>uu>}}}}},{{{<o!>},<eaa!!!!!>i!!}e'}!!!!!>!!!>>},<o{>},{{}},{}},{{<!>,<!>},<a}>,<!>!!o"!>,<!!!!<,e>},{{{<!>},<a'iu'}u>},{{}}},{<oaa,,!>,<!!!!!>!>},<e!!a!!"}oe!!!>,>},{<!!!>},<!>},<',!}'}!>'!>,<!>},<"}u>}}}},{{},{},{<!>,<!>,<!>,<}i{!!!>,<<!!!>i>}},{{{{<{{!}iu!!{!!!!!!!>!!!>},<!!}u>},{{},{<!!a'u!>,<,!>!>},<,!!"!>},<!>!>},<ae'{>,<o!!{>}}},{{{{<!!!>ei!>,<o{'!!!>}!>},<!!!!!>},<!'>},{{<!!!>!{e,<>}}},{<ei,!!u<!!au>,{<"ui!>!{!!!>},<oo"}u!>},<!!!>},<!>},<>}},{<<!>},<!>,<"<!>,<!>,<!>},<a>,{<!!!u!ai}!e!>o>}}}},{{<!>,<!!!!!u,'!>'!uoo>}}},{{<'e!i!>!>{u,!>!!{!>,<!!!>>}},{<}'}'a!>}!!!e!!i!!{<!>,<>,{<!>!>!>,<o!!!!ueo!!i>}}}},{{{<'>,{<!!!>u!<!>},<!u!!a!>i!!,!>o"u,!!"a>}},{<"e<!>!!o!!ia!!!>!!!>>},{}},{{{<e!>{i{!!!!!!!!!!}!>,<!>,<o<{}>}},<!'e{i!>},<eea}<'!!!>!>'!,!ua}!!}>}},{}}},{{{{<<"!!!!{a!!i,a!!!>,,i!!!!!>o!a!!!>>}},{{}}},{{{<!!!><!>,<{,>}},{<{!>},<!!!>!!'!>},<a'e!'e}}{u',>,{{}}},{{<!!!!!!i!>a!>},<!!{!!i!!!>}o>,{<<e!!!>o!>},<!!!!!>!!a}"}!!u,!!!>!>,<>}}}},{{{},{{{<!>},<a>},{<,!!!>'u!!!>u!>},<<!>},<>}},{{<!>},<"""<!{ea!>,<"!!!><,o!!!e!!<!!!>!>},<>}}}}}}},{{{{{{},<>}},{{<"{!>!>,<u!o!!}!>!a"!>!>},<}<,i!!<>}}}},{{{{<{!>!!!>>,{}}},{}},{{{},{}},{{<!>,<!>!>"!au<"!!u!!!a}!!<>},{<uao"!!"!!!>{'e}!{!>},<}!>},<!!!!ou>}}}},{{{{{{{{<!>},<{!!!>,<i'{}!>,<uu!!!><!!{"o!!<!!iu>}},{{{<!>,<!,!>,<!>!!!>e"o>},{<u!!!>{i!!!!!>}!>},<'!!}e''<">,{<"!,!>},<!!o!!i!!!>!>},<e!!!>,{'!o!{!>},<!a!!!>,<>,<>}}},<{<e'auuae"''!>,<!>},<!>,<>}},<i{o!>},<i>},{{},<!>},<!>!>},<!!ie!>},<!e!>,<}'!>},<!>},<<"!>>}},{{<!>,<!>!!iie!>},<!>,<}!!aia!!{>}},{{<!>!>,<o!!!>a!,!>!!,a!!!>!>,<}ie">},<,!!!>!!!>!!"{i'!{u!!u,}!!!!!!',}!!,>}}},{{<i<a!,,!>},<!>},<!!a!>">,{<"<!!uae<>}},{{<,!>},<}!u!!ea!>}>},{{<!!"a!}i!>,<,!i!!!>},<!>,<!!",!!">}}}},{{{<"!>},<!!!>>,{<!>>}},{{}},{<!!<!!!>uo!!o!aoe!>,<>}},{{{<!>,<!>!!ia'e>}},{{{{<o!>,<!!!>},<!!>},<!>,<!!}",!!!>},<<!!o{aoiu!!a!!!>{>},{{},{}},{{},<}!'!!!!!!}!o!>,<u!>>}},{{<"i!>,<!>o"i!!"!!!>'!!u!>,<>,{{},<!>{!!!!o,!>,<e!>},<i!!a"!!!>>}}}}},{{{{<!>,<!!a!!!>!!!!!>"!<!i>},{{<!!i',<!!u>}}}},{{{{{{<}i'!>!>},<,>}},{<<<a},ii!!u>}},{<}!>,<}!,!!o!>,<,eo<ea"<,!!!!!>,<{>}},{<>,<!!!>a>},{<u!>!!!>i!!i'!>,<e"!i>}}},{{},{}}}},{{{<!>,<!!<e>},<<!!<!!a{!!!>ii{,'!!iue>},{{{{{<!>,{u!!!>,<!a!"!>'!>,<u>},{{<o!!!!{!!!>ei!!,!!'!!a>},{{{},{}},{{<{i"a!!!!>},{{},<!!!>!>ii,!!e<!!!>},<>}}}},{<!>{}e"!!a}!>!o!>},<>}},{<}!>},<',!!!>o<u!>},<<{'!!!>a!!!>!!{!!!!{>}},{{{<!>!!!>"!!>},{<!>{!{,!>,<!!!>'>,<!>,<!!!!!!'!!eo"!!!>!!oo'>}}}},{{{},<!a!!oe>}}},{{<}!>},<<'!>,<<!!!>o{!uo>}}}}},{{{{{<!!!>!!},!!!>a"i!"!>",eo!>!}o>},<!!!>,<!>},<!>},<!!!!!!!>auu}!!!>},<!!!>},<!>},<''>},{{},{<{}!>,'!!!!!>},<!u{!!!>!!{!!!>"!!!>!!!>{!!!>},<>}},{{{{<!>,<"!>>,<,'e!!!>'oo,!!!i!>},<!<!>!!!>!!}"'>},<o<}{!>!!!!!>u<u!>,<i}!>,<>},{<}o{!>,<{<,!!{>,{}}},{{<!>>,{<!>},<!>},<ue!!!!<!e!!!><e}"!!!>}!>ie!>,<>}},{<<!>,<o!>},<"o<ea,>}}}},{{<<}!!!!!>!>},<"}!!ii<"'!eio!,>,<'!>!!!{'!!'"}i>}},{{{<',>},{}},{{}},{<!>},<<!a>}},{{<!!i!>},<'u!{{!>},<a!>,!!!>>,{{{<e!<"!!!>},<!",,!!!!o!>u!!',>}}}},{{{<e!,!!!!!>'!!!>!!!!{,!!"u!!!>!>"ee<!>,<"!!!>>,<{!!!!!>!!<!,'o"!>,<!!o!!'!>,<!!>},{<!!oe}eu!>{!>a!>,<!>,<e>}},{<!!u!!e!!}"i!>,<!!!>},<<!!!>!>,<uu!i}'!>},<>,{<!!ee{{u>,{{{{<!>},<}i{!>!>,!!ao!!!>!!}>}}},{{{{},{}},<!!!>{!!!>!>},<<{a"!!!!!>,<>},<}<!!}>}}}}}}},{{{{{{<a'iu!!o<<"'u!!e{'!>},<>},<{!u!!!!!>!!u"ao"{!!!>},<{>},{{{<o!>},<}>,<!>,<{!>,<!!!>},<!!!>i!!ai'!>!>},<!>"u!'>},{<!!!>"!>u!>},<!>!!{}{eu!!{e>}},{{},{<!>!>}u!"!!!>!e}!!!>,au""i!!!>!!>}}},{{{<eii!!,>}}}},{<!!!{>,{}},{<!>},<'eo<u'"'{!!!>!!!>u<'>}},{{{{},{{{<"!!}">,{<!!!>!i!!e>}},{{},{<!>},<>}}},{<ou",!a!>,<!>!>,<!>,<,!!!i>,<!!e!,!!!!{e!!e,a!>},<!{{o'!>,<""!>>},{{<<'i<!!!>}>},{}}},{{<!!{!!!>!i!>eea!ia!>}a!!''>},<!>},<'!>},<ao>}},{{{{{},{{<}!>,<u!!!!!!<!}!!!>>},{}}},{{<o!>},<o!>},<!e!!!>>,<e<'!!!!!>!!!!!!,"!>>}}},{<ie!!"}!>!>!"!>,<e'!>},<!>,"u"!o,>}},{<!<}!>"!>},<<i!{u!>},<,!!!>}e{a!!!!<>},{{<}!>,<ea{!!!o!>,<!>,<!!!>eu!!<!!!e!>},<i">}}},{{{<!>},<ai!!!>ii>}},{{{<{>},{<"!>},<!>,<'!>,<'!>,<!!o}!!!!!!a!>u""!!e'>}},{<!!!a!!"!!!>>}},{<i!>},<!!!>eu<{u>}},{{<!!<!!!!<>,<uo!>,<>},{<!>},<e!!!!!!u!!!>>,<!!!{!!!>>},{<!!!>}i!>},<!'a{!>},<!'a}u!!{}!!!>,<>,{{<i!>!>,<u!>},<u!<e>}}}}},{{{{{<!>ua!>},<'u!!o!!!>!>,<>},<>},{},{{<au!!!>},<!!!>!!o!>>}}},{},{{<!!!>e}"!!!!!!!!!u!!'o'!>},<a>},<e}o!!!>!>},<!>{aue'ee<!>{a>}}},{{{<i{<o''!e">,{{},{{<o>}}}}},{{{<}!'o!>},<iui>}}}},{{{{<''!!!!"}!!!>{!!o!!'!}!>i!!!!e<!{!!i>},<o>},{{{},<ie}!!!{!!!>!!>},{{{<!>},<!!}i>},{<,{!!!!!><e!!{!u<e!>!!!>},<!!a!>,<"">}},<!aa>},{{<!!!>},<a!>,<!>},<!a!>},<!>,<>},{<a!>>}}},{<e">}}}},{{<!!!>>},{<!e!!<<,!!!>"ia!>},<e!!,>,{<!!!!!!!>u!!!o,<,!>a!!u!>a!>},<"!!!>,!>>,{{},<'!!!>'>}}},{{<>,{{<{,a!!i!!!>!!!>!>,!!u<!!!>!>>}}},{<ei<!><'ue!>i>,<!!ea!!{"",>},{{<!>{!>,<!!o}ii!>},<!o'!>},<!>},<",!!!{!>!>,<,>}}}}},{{{<!>},<i>},{<'<,a}!!!><o<!>},<!!ue}"!>},<!>{>}},{{{<ai!!{}!>},<,!!!>e!!!>},<!>!>!ei>,{<u!!e,<!!{o!>},<!!!!!>{"!!!},!!u!!>}},{<uou<a!!!>!!o!>u!>,<!!>},{{<!>},<i}{o!"a>},{<!<ie!!!>}'<!!{u"uu!!!>!>>}}},{{{<ao'i{a<}e"{!!!>oa!!!!!!!>,{!>},<>},<!!>}},{}},{<!>},<i>,<!>,<ie!>o},!!u{!!i>}}},{{{{{},{}}},{{{{<i!>,<!}!>'}>}},{<!!!>!>,<o<!!!>ei!>},<oe"!>"}>,{{},{<!,!!o!!!>,!!e!u!!!>!!{>}}}},{{{},{<oe!!e!>},<!!!a'i!!}{!>"!u!!ea!,{oi>}}}}},{{{<!>,<!>},<!>,<>,{<aoe<!>},<"!>},<!"}!!a!>},<>}}},{{{{{{<}u,!>,<},!>!>!eu!!!>u<!>},<!!}o!!>},<"!>,<!>,<ea}!!}ae}>}}},{{<!>},<a!>},<<"!>"e!,{u!!!>!!!>au!!!>>},<a!>},<"!!o!>},<a!>}>}},{{<,,e!!!>!>!!!>!!!>!}>},{<!>,<"}!>!>!>},<{!>},<!>},<!!!>!>!!"{>}},{{{{{}}},{<!a!!!>e!!!>!'a!{!e}i>}}}},{{},{<i,!!ao!>,<u<oi!>},<'!>,<>,{}},{<'i!!,"!>},<!!!>,<u}!!!!e{!>},<!>,}>}}},{{<oo!>,<a}!>,<!!e'a>},{{{{<o!"a}{<!!!>,e'a>},{<i!>,<{!!o}e!>},<!><>}}}}},{{{<}!>},<,!!o!!o<!>},<!!!>!!a!<}>,<a!!'{i!>},<i!>},<'i!>,!!i!>!>},<!><">},{<,i!<au!>},<!!!>},<o!!!>!!!>e}!>,<,i>}},{{<o!>},<"'!!!>!!}!><"!>},<!<oo}{!>,<>},{<!!!!{!!"}}}{a',{au>,{}},{}},{{{{<ai!!!>,<!>},<,!!,<!},{<!>},<}!!!>'!!!>>},<!!!!!><!>},<!!!!!e!!i>},{{<!o,!>,<o!!!!!!a>},{<!>!>},<o!>},<!>ae<>,{<e,o}!!'{{!>!e<io!!!>!!!i{'!>!>,<>}}}},{{<ea'!!!!o}'a>},{{}},{}},{{{{<e!!!!!!!>!>>}},{<!!!>>}},{<'!>},<u!>'}>,<}>},{{{<!!}iu<!>,<!>,<!>},<!>,<>},{<'o{!!>}},{<i<}!>o"!>,<!>!!!>"!!!>!!uoa>}}},{{{{{{<e!o"!!!>!!,o!!!>>,{}},{<'!>{!!!>!!!>!>},<"<!>u!!u!!!!o!>>}},{{<e!!ao!<a!>},<!e!{>}}},<!!',iia}!!!><u<}>},{{<!!!>},<}}!>,<,!!!>{!!!''!!i!!"!>,<'>}},{}}}}}},{{{{<{{!!'!>!>,<<!!!>!>,<!!!>!<!>{!>},<!!{!>,<i">},{<>}},{{<}<i!!}!!e!!<o!!!!u!!!>},<<!,a<>}},{{}}},{{{<,!!!><}!>!!!!!>!!oi{>},<{ueuio!!!>>},{{{},{}},{{<a!>},<!,!>!>,<!>!}!>},<aee'!>,!'oe!!!>>},{<!!!{''}i}o!!>}}},{{},<!>,<!""o<!<!>},<!!">}}},{{{{},<,>},{}},{{{}}},{{{{{}},{{<!>},<!>,<"{!!>}}}},{{}},{{}}},{{<!!o!>},<!!!>},<!!!>!>e!>,>,{<o!!a!>o!>!!!!!>!>,<a!>"}!{!>,<!"!!!'>}},{{}}}}},{{{{{}},{<!{'"<!!!>}>,<u!'!>!>,<a!!!}!>a!>!>eee<!>,<>}},{{{{{},<!>,<{a!!{!>!>},<,!ueao'>},{{{<!!!!!>},<!!aa!>a<!>!,oo!!!>!!!>>}}},{{<>},<!!!>},<!>,<>}},{{{<e!!!>,<'!a,!!ae{!>,<'{a!>},<!uoeee>},{{{<oa!>},<!>,<!}!!!>>},{<"!{,'a!>},<!!,}oa'>}},{<<!!!!!>e}>},{<{"!<e{!!!!!{!>{'<!>},<!!oiua!!!>},<>,{<!!!><!>,<oo!!!>!!!>i!!!>''!!e'!!!>,<>}}}}},{{{<<!!'!>},<!!!>i"!>},<"!!"'!>>},{<o,{>}},{{{<'>},{<!!!>},<>}},{<a!>,<""e'a'<!>o!!!>,<>},{{<!>},<i!!!!<o!!!>},<!">},{<>}}}},{{{{<"!>!>!>,<!,,!!<"!!!!!>e,!>{}!>,<!>,<!}>},<<!>},<{u<!!"!>,<!a""!!!!e!!!!<"eou>},{{<o">},{<}>}}},{{<!!!>i{>},<!>"uue{>}}},{{{<!'a!,!!"!!!>!>,<<o,<!>ae,!!!>!e!!u,>},{}}},{{{}},{{<!>},<!>},<!>,<>,<,,o!>},<!!'},{!!a!>,>},{{{<<>},{<"!>,<!!!!!>!>!"u!!!>!>,<!>,<!!!>u{au!>},<"!>},<>}},{<!u!>'!!!>"uu>}}}},{{{{},{<a>}},{{},{{{<}oe>},{<u{}!!<}a!>,<}!!'!}!"!>"<>}}}},{{}}},{{<i>,<{o>},{<u!!!!i!!!>!>!!!>i"!!,{!!!>,<'"!}>},{{<oa!!!>!>},<!>},<!!>},{{},<u<u<!!!!!!!!!>},<'!!}!!!>e!>},<{!>,<>}}},{{{<"a!!!>'!>},<!{!>,<aa!!!!!>'>},{{}}},{{<o!!!!"{!>,<,"u!!!><!!a,>},{}}}}}},{{{{{{<,a<o"!!!>'!!!>},<}!io>},{<>}}},{{<!!!>!!!o}!!!>!}"!>o!>}!>,<'a!!!!!'}!>},<!a>,{{<!a!!!>",u!>,<>},{<!!!>},<!>,eooo!>},<>}}},{{{<!'i!!u!>!!!!!!!>aae!!!>o!!!>!i>}}}},{{{{{<!!!>o>,{<o,!>,<{u!""!!}",!!{!>,"}!!!>{>}},<!!eu!>!>},<,ei,e!>},<!!}e"!>>},{<e<uie,!>!!>,{{<{!!oa!>!!,u!!!>},<!!!!!!'!>},<!>,<,!!}"!>>},{<!>},<ue!!!>!!!!!>!!}>,<e!!}o}o!>},<oi{<!>,<e!'"<!!u>}}},{<u!!<u{!>},<!!!>!!!>{!io!!i>,<,{"!!!>},<a!,!!!><e!>o!!!',i!!o{!!!>},<!>>}},{{{<!!!!!!a!>!!'!!!!!>},<e{!!!>"!!!>!>},<!!!>!'}<>},{}}}}},{{{<!!!!u!>,!!!>,<oe,{ua{!>!>,<"!!!>a!>>},{},{{{{<}e}!>,<a"i!!ii,>,{<!!!!!!!>!>},<!!">}}},<!!'!!!>o>}}}}},{{{},{{},<i!>,<!>},<i}ua'<!>},<{>}},{<>,{}},{}},{{<u{!!!>},<,>},{<!!"}a,'!!!>!>i!!!e!>,<aia!!}!!!!!!!!{!>!!u!e>,{<,o!!!!!!!!"!''!e!><!!!!!>,<i!!a,!<!!{>}}},{{{{<!!!>!!,!!!>{}!!!>>},<!,e!o!!}"o!>,<>},{{},{<ao!!a!!!!!e<'"{!o"''{!!!>'>,{<o!><!>i!>!>,<'!>},<<!!<!u!iao!{,>}}}},{{{}},{<!!ae<>},{{<}ae>},{}}},{}}},{{{{<!{,i!!e!>!!!!!>!!i!!{"o!>},<,a{o>,{<!a!!e!>},<{e'u!>,<}!>},<'"!!u>}}},{{},<!!<!>>},{{{<'!>,<a"o!!a!>e>},{<!>},<"i!!>}},{<"!<!!i!>!!<'!>,<'!!,<u!>!>},<a!}!>,<a>,{}}}},{{{<a,o<"!!!>}'!!!!}>},{<!>!!!>>}},{{{}},{<e'!>},<a{u!>},<!>i'<!!i!ui,!>},<"}>}},{<,!!!<o>}},{{{{<ai>},{}}}}}},{{{{<!!!!>}},{{<!!!>!!<u!',!>},<>},{<!!{!{>}}}}}}`;

function day9_part1(input) {
  let i = 0;
  let score = 0;
  let nestedGroups = 0;
  while (i < input.length) {
    switch(input[i]) {
      case '{':
        nestedGroups += 1;
        score += nestedGroups;
        break;
      case '}':
        nestedGroups -= 1;
        break;
      case '<':
        while (input[i] !== '>' && i < input.length) {
          if (input[i] === '!') {
            i++;
          }
          i++;
        }
        break;
      case '!':
        i++;
      default:
        break;
    }
    i++;
  }
  return score;
}

assert.equal(day9_part1('{}'), 1);
assert.equal(day9_part1('{{{}}}'), 6);
assert.equal(day9_part1('{{},{}}'), 5);
assert.equal(day9_part1('{{{},{},{{}}}}'), 16);
assert.equal(day9_part1('{<a>,<a>,<a>,<a>}'), 1);
assert.equal(day9_part1('{{<ab>},{<ab>},{<ab>},{<ab>}}'), 9);
assert.equal(day9_part1('{{<!!>},{<!!>},{<!!>},{<!!>}}'), 9);
assert.equal(day9_part1('{{<a!>},{<a!>},{<a!>},{<ab>}}'), 3);
console.log(day9_part1(input)); // 10050

function day9_part2(input) {
  let i = 0;
  let garbageChars = 0;
  while (i < input.length) {
    switch(input[i]) {
      case '<':
        i++;
        while (input[i] !== '>' && i < input.length) {
          if (input[i] === '!') {
            i++;
          } else {
            garbageChars += 1;
          }
          i++;
        }
        break;
      case '!':
        i++;
      default:
        break;
    }
    i++;
  }
  return garbageChars;
}

assert.equal(day9_part2('<>'), 0);
assert.equal(day9_part2('<random characters>'), 17);
assert.equal(day9_part2('<<<<>'), 3);
assert.equal(day9_part2('<{!>}>'), 2);
assert.equal(day9_part2('<!!>'), 0);
assert.equal(day9_part2('<!!!>>'), 0);
assert.equal(day9_part2('<{o"i!a,<{i<a>'), 10);
console.log(day9_part2(input)); // 4482
