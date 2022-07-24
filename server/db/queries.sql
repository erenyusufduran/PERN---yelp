select * from restaurants left join 
    (select restaurant_id, count(*), trunc(Avg(rating),1) 
    as average_rating from reviews group by restaurant_id) 
    reviews on restaurants.id = reviews.restaurant_id;

select * from restaurants left join reviews on restaurants.id = reviews.restaurant_id; 

select * restaurants inner join reviews on restaurants.id = reviews.restaurant_id; 

select restaurant_id as ID,AVG(rating) from reviews group by restaurant_id; 

select restaurant_id, count(restaurant_id) from reviews group by restaurant_id; 

select location, count(location) from restaurants group by location; 

select trunc(AVG(rating),2) from reviews where restaurant_id=30; 