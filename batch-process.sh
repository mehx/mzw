magick mogrify -resize "640^" -quality 100 -path ../ *.jpg 

cd ..

for i in *.jpg ; do
    mv -v $i ${i%.jpg}-preview.jpg
    touch ${i%.jpg}-preview.md
done