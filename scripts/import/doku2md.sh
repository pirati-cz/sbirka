#!/bin/bash  
# Skript pro LaTeXování dokumentů na Pirátské wiki

#wget -O stranka.html https://www.pirati.cz/rules/ropr?do=export_xhtmlbody

# stáhnu si to
cd dokuwiki-to-markdown-converter
rm -R input
mkdir input
wget -O input/stranka.txt $1?do=export_raw
php convert.php input/stranka.txt
mv input/stranka.md ../stranka.md
rm -R input
cd ..
